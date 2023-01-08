from pydantic import BaseModel

class Consumer(BaseModel):
    name: str
    phone: str
    email: str
    isActive: bool