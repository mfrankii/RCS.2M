from pydantic import BaseModel

class Plan(BaseModel):
    plan_id: int
    name: str
    price: float
    dataSize: float