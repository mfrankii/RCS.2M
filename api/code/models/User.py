from pydantic import BaseModel

class User(BaseModel):
    userName: str
    email: str
    password: str


class loginUser(BaseModel):
    email: str
    password: str