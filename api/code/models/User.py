from pydantic import BaseModel

class User(BaseModel):
    user_id: int
    userName: str
    email: str
    password: str
    plan_id: int
