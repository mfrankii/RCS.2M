from pydantic import BaseModel

class User(BaseModel):
    idUser: int
    Name: str
    Email: str
    Password: str