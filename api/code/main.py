import os
from fastapi import FastAPI
from routes.user import user
from routes.plan import plan
app = FastAPI()


app.include_router(user)
app.include_router(plan)
