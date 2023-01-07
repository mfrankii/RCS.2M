from fastapi import APIRouter, status
from fastapi.responses import JSONResponse
from models.User import User,loginUser
from config.db import mydb
from schemas.user import userEntity,usersEntity,hash,validate_password
from hashlib import sha1
import ssl
import smtplib
import secrets
import config.common
import re

user = APIRouter()

@user.post("/api/login", tags=["User"])
async def login(user: loginUser):
    mycursor = mydb.cursor()
    sql = "SELECT * FROM User WHERE email = %s"
    val = (user.email, )
    mycursor.execute(sql, val)
    data = mycursor.fetchall()
    if len(data) == 0:
        return { "Status": False, "Username": "" }
    pass_from_db = data[0][3].strip()
    userName = data[0][1].strip()
    is_successfull = validate_password(user.password, pass_from_db)
    return { "Status": is_successfull, "Username": userName }

@user.put('/api/CreateUser', tags=["User"])
async def create_user(user: User):
    config_ = config.common.load_config()
    IsMatch = re.fullmatch(config_['regex_password'], user.password)
    if not IsMatch:
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

    # =============================================================================================


# change password :
@user.put('/ChangePassword', tags=["User"])
async def change_password(user: User, new_password: str):
    # TODO
        # get user from DB
        # validate_password(user.password, )
    # Hash the new password
    password_hash = hash(new_password)
    # Update the user's password in the database
    update_password(user.userName, password_hash)
    # Return the updated user object
    updated_user = user.copy(update={"password": password_hash})
    return userEntity(updated_user)


#:ForgotPassword
@user.post('/ForgotPassword', tags=["User"])
async def forgot_password(user: User):
    # Generate a random value and hash it using SHA-1
    random_value = secrets.token_hex(16)
    password_hash = sha1(random_value.encode()).hexdigest()

    # Send the random value to the user's email
    # Using a self-signed certificate and TLS 1.2 protocol for security
    context = ssl.create_default_context(ssl.Purpose.SERVER_AUTH, cafile="cert.pem")
    context.protocol = ssl.PROTOCOL_TLSv1_2
    with smtplib.SMTP_SSL("smtp.example.com", 465, context=context) as server:
        server.login("noreply@example.com", "secret")
        message = f"Your new password is: {random_value}"
        server.sendmail("noreply@example.com", user.email, message)

    # Update the user's password in the database
    update_password(user.userName, password_hash)

    # Return the updated user object
    updated_user = user.copy(update={"password": password_hash})
    return userEntity(updated_user)


#Used in ForgotPassword and ChangePassword :
def update_password(user_name: str, password_hash: str):
    # Update the user's password in the database
    mycursor = mydb.cursor()
    sql = "UPDATE User SET password = %s WHERE userName = %s"
    val = (password_hash, user_name)
    mycursor.execute(sql, val)
    mydb.commit()

