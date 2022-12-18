from fastapi import APIRouter
from models.Plan import Plan
from config.db import mydb
from schemas.plan import planEntity, plansEntity
plan = APIRouter()

@plan.put('/api/CreatePlan', tags=["Plan"])
async def create_plan(plan: Plan):
    mycursor = mydb.cursor()
    sql = "INSERT INTO Plans (name, price, dataSize) VALUES (%s, %s, %s)"
    val = (plan.name, plan.price, plan.dataSize)
    mycursor.execute(sql, val)
    mydb.commit()
    return planEntity(plan)

@plan.get('/api/GetPlans', tags=["Plan"]) 
def get_all_plans():
    mycursor = mydb.cursor()
    sql = "SELECT * FROM Plans"
    mycursor.execute(sql)
    data = mycursor.fetchall()
    return plansEntity(data)