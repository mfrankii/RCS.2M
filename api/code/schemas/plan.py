from models.Plan import Plan

def planEntity(item) -> dict:
    if type(item) is Plan:
        return {
            "plan_id": item.plan_id,
            "name": item.name,
            "price": item.price,
            "dataSize": item.dataSize
        }
    else:
        return {
            "plan_id": str(item[0]),
            "name": item[1],
            "price": float(item[2]),
            "dataSize": float(item[3])
        }

def plansEntity(entity) -> list:
    return [planEntity(item) for item in entity]