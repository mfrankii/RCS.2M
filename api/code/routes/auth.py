from fastapi import APIRouter, status
from models.User import User
from config.db import mydb
from hashlib import sha1
from datetime import datetime, timedelta
import secrets
import ssl
import smtplib
import certifi
import socks
import os
from fastapi.responses import JSONResponse
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from models.User import loginUser
from schemas.user import validate_password

auth = APIRouter()

@auth.post("/api/auth/login", tags=["Auth"])
async def login(user: loginUser):
    mycursor = mydb.cursor()
    sql = "SELECT * FROM User WHERE email = %s"
    val = (user.email, )
    mycursor.execute(sql, val)
    data = mycursor.fetchall()
    if len(data) == 0:
        return JSONResponse({ "Status": False, "Username": "" }, status_code=status.HTTP_401_UNAUTHORIZED)
    pass_from_db = data[0][3].strip()
    userName = data[0][1].strip()
    is_successfull = validate_password(user.password, pass_from_db)

    if is_successfull:
        response = JSONResponse({ "Status": is_successfull, "Username": userName }, status_code=status.HTTP_200_OK)
        response.set_cookie(key="Username", value=userName)
        return response
    else:
        return JSONResponse({ "Status": is_successfull, "Username": "" }, status_code=status.HTTP_401_UNAUTHORIZED)

@auth.get('/api/auth/sendMail', tags=["Auth"]) 
def send_mail(email: str):

    # crate token
    random_value = secrets.token_hex(16)
    token = sha1(random_value.encode()).hexdigest()

    # expired
    expired = datetime.now() + timedelta(minutes=15)
    expired = expired.strftime('%Y-%m-%d %H:%M:%S')

    # save in DB
    mycursor = mydb.cursor()
    sql = "INSERT INTO Token (email, token, expired) VALUES (%s, %s, %s)"
    val = (email, token, expired)
    mycursor.execute(sql, val)
    mydb.commit()

    # send mail
    EMAIL_USER = os.environ.get('EMAIL_USER')
    EMAIL_PASS = os.environ.get('EMAIL_PASS')
   
    #Setup the MIME
    message = MIMEMultipart()
    message['From'] = EMAIL_USER
    message['To'] = email
    message['Subject'] = 'RCS.2M - Change password'
    message.attach(MIMEText(f"Your token for change password: {token}", 'plain'))
    
    #with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
    #    server.login(EMAIL_USER, EMAIL_PASS)
    #    server.sendmail(EMAIL_USER, [email], message.as_string())
    return JSONResponse("Sent",status_code=status.HTTP_202_ACCEPTED)
