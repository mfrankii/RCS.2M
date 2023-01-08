from fastapi import APIRouter, status
from fastapi.responses import JSONResponse
from models.User import User
from config.db import mydb
from schemas.user import userEntity,usersEntity,hash,validate_password
from hashlib import sha1
import ssl
import smtplib
import secrets
import config.common
import re
from datetime import datetime

user = APIRouter()
config_ = config.common.load_config()

@user.put('/api/CreateUser', tags=["User"])
async def create_user(user: User):
    is_match = re.fullmatch(config_['regex_password'], user.password)
    if not is_match:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, 
            content="The password must include:\nAt least 10 characters \n any of the special characters: @#$%^&+=! \n numbers: 0-9 \n lowercase letters: a-z \n uppercase letters: A-Z")
    
    mycursor = mydb.cursor()
    sql = "INSERT INTO User (userName, email, password) VALUES (%s, %s, %s)"
    user.password = hash(user.password)
    val = (user.userName, user.email, user.password)
    mycursor.execute(sql, val)
    mydb.commit()
    return userEntity(user)


@user.get('/api/GetUsers', tags=["User"]) 
def get_all_users():
    mycursor = mydb.cursor()
    sql = "SELECT * FROM User"
    mycursor.execute(sql)
    data = mycursor.fetchall()
    return usersEntity(data)

@user.put('/api/ChangePassword', tags=["User"])
async def change_password(email: str, new_password: str, old_password: str):
    ## get user
    mycursor = mydb.cursor()
    sql = "SELECT * FROM User WHERE email = %s"
    val = (email, )
    mycursor.execute(sql, val)
    data = mycursor.fetchall()
    if len(data) == 0:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content="") 

    ## check old password
    user = data[0]
    db_password = user[3]
    if not validate_password(old_password, db_password):
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content="")
    
    ## check new password
    is_match = re.fullmatch(config_['regex_password'], new_password)
    if not is_match:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, 
            content="The password must include:\nAt least 10 characters \n any of the special characters: @#$%^&+=! \n numbers: 0-9 \n lowercase letters: a-z \n uppercase letters: A-Z")
    
    # update
    password_hash = hash(new_password)
    update_password(email, password_hash)
    return JSONResponse(status_code=status.HTTP_202_ACCEPTED, content="password changed")

@user.put('/api/ChangeForgotPassword', tags=["User"])
async def forgot_password(token:str, email:str, new_password: str):
    mycursor = mydb.cursor()
    sql = "SELECT * FROM Token where token = %s and email = %s"
    adr = (token, email)
    mycursor.execute(sql, adr)
    result = mycursor.fetchall()
    if len(result) == 0:
        return JSONResponse("Invalid token!", status_code=status.HTTP_401_UNAUTHORIZED)
    user_token = result[0]
    expired_token = datetime.strptime(user_token[3], '%Y-%m-%d %H:%M:%S')
    is_expired = datetime.now() > expired_token
    if (is_expired):
        return JSONResponse(content="Expired!", status_code=status.HTTP_401_UNAUTHORIZED)

    is_match = re.fullmatch(config_['regex_password'], new_password)
    if not is_match:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, 
            content="The password must include:\nAt least 10 characters \n any of the special characters: @#$%^&+=! \n numbers: 0-9 \n lowercase letters: a-z \n uppercase letters: A-Z")
    
    # update password
    password_hash = hash(new_password)
    update_password(email, password_hash)
    return JSONResponse(status_code=status.HTTP_202_ACCEPTED, content="password changed")

def update_password(email: str, password_hash: str):
    # Update the user's password in the database
    mycursor = mydb.cursor()
    sql = "UPDATE User SET password = %s WHERE email = %s"
    val = (password_hash, email)
    mycursor.execute(sql, val)
    mydb.commit()

