from fastapi import FastAPI
import os

app = FastAPI()

@app.get('/')
async def get():
    return {
        "USERNAME_DB": os.environ.get('USERNAME_DB'),
        "PASSWORD_DB": os.environ.get('PASSWORD_DB')
        }