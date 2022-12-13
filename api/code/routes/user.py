from fastapi import APIRouter
from models.User import User
from config.db import mydb
from schemas.user import userEntity,usersEntity,hash
user = APIRouter()

@user.put('/CreateUser', tags=["User"])
async def create_user(user: User):
    mycursor = mydb.cursor()
    sql = "INSERT INTO Users (userName, email, password, plan_id) VALUES (%s, %s, %s, %s)"
    user.password = hash(user.password)
    val = (user.userName, user.email, user.password, user.plan_id)
    mycursor.execute(sql, val)
    mydb.commit()
    return userEntity(user)

@user.get('/GetUsers', tags=["User"]) 
def get_all_users():
    mycursor = mydb.cursor()
    sql = "SELECT * FROM Users"
    mycursor.execute(sql)
    data = mycursor.fetchall()
    return usersEntity(data)