from fastapi import APIRouter, status
from fastapi.responses import JSONResponse
from models.Consumer import Consumer
from config.db import mydb
from schemas.consumer import consumerEntity, consumersEntity
consumer = APIRouter()

@consumer.post('/api/CreateConsumer', tags=["Consumer"])
async def create_consumer(consumer: Consumer):
    mycursor = mydb.cursor()
    sql = "INSERT INTO Consumer (name, phone, email, isActive) VALUES (%s, %s, %s, %s)"
    val = (consumer.name, consumer.phone, consumer.email, consumer.isActive)
    mycursor.execute(sql, val)
    mydb.commit()
    return JSONResponse(status_code=status.HTTP_201_CREATED, content="") 

@consumer.get('/api/GetConsumer', tags=["Consumer"]) 
def get_all_consumers():
    mycursor = mydb.cursor()
    sql = "SELECT * FROM Consumer"
    mycursor.execute(sql)
    data = mycursor.fetchall()
    return consumersEntity(data)