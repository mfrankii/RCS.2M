from pydantic import BaseModel

class Consumer(BaseModel):
    consumer_id: int
    name: str
    phone: str
    email: str
    plan_id: int