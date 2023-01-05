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

auth = APIRouter()

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
    message['Subject'] = 'RCS.2M'
    message.attach(MIMEText(f"Your link for change password: https://localhost:5001/ChangePassword?token={token}", 'plain'))
    
    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(EMAIL_USER, EMAIL_PASS)
        server.sendmail(EMAIL_USER, [email], message.as_string())
    return JSONResponse("Sent",status_code=status.HTTP_202_ACCEPTED)

@auth.get('/api/auth/validateToken', tags=["Auth"])
def validate_token(token: str):
    mycursor = mydb.cursor()
    sql = "SELECT * FROM Token where token = %s"
    adr = (token,)
    mycursor.execute(sql, adr)
    result = mycursor.fetchall()
    if len(result) == 0:
        return JSONResponse("Invalid token!", status_code=status.HTTP_401_UNAUTHORIZED)
    user_token = result[0]
    expired_token = datetime.strptime(user_token[3], '%Y-%m-%d %H:%M:%S')
    is_expired = datetime.now() > expired_token
    if (is_expired):
        return JSONResponse(content="Expired!", status_code=status.HTTP_401_UNAUTHORIZED)
    return JSONResponse(user_token[2], status_code=status.HTTP_200_OK)


