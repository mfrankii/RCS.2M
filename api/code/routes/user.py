from fastapi import APIRouter
from models.User import User
from config.db import mydb
from schemas.user import userEntity,usersEntity,hash    
from hashlib import sha1
import ssl
import smtplib
import secrets
user = APIRouter()

@user.put('/api/CreateUser', tags=["User"])
async def create_user(user: User):
    mycursor = mydb.cursor()
    sql = "INSERT INTO Users (userName, email, password, plan_id) VALUES (%s, %s, %s, %s)"
    user.password = hash(user.password)
    val = (user.userName, user.email, user.password, user.plan_id)
    mycursor.execute(sql, val)
    mydb.commit()
    return userEntity(user)

@user.get('/api/GetUsers', tags=["User"]) 
def get_all_users():
    mycursor = mydb.cursor()
    sql = "SELECT * FROM Users"
    mycursor.execute(sql)
    data = mycursor.fetchall()
    return usersEntity(data)


    # =============================================================================================


# change password :
@user.put('/ChangePassword', tags=["User"])
async def change_password(user: User, new_password: str):
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
    sql = "UPDATE Users SET password = %s WHERE userName = %s"
    val = (password_hash, user_name)
    mycursor.execute(sql, val)
    mydb.commit()

