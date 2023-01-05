from pydantic import BaseModel

class User(BaseModel):
    user_id: int
    userName: str
    email: str
    password: str


class loginUser(BaseModel):
    email: str
    password: str