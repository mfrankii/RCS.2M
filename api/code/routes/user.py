from fastapi import APIRouter
from models.User import User
from config.db import mydb
user = APIRouter()

@user.get('/', tags=["User"])
def create_user(user: User):
    mycursor = mydb.cursor()
    sql = "INSERT INTO user (name, email, password) VALUES (%s, %s, %s)"
    val = (user.name, user.email, user.password)
    mycursor.execute(sql, val)
    mydb.commit()
    return { user }

@user.get('/', tags=["User"])
def get_users():
    mycursor = mydb.cursor()
    sql = "SELECT FROM users *"
    mycursor.execute(sql)
    data = mycursor.fetchall()
    return { data }