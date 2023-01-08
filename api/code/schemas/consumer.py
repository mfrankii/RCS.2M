from models.Consumer import Consumer

def consumerEntity(item) -> dict:
    if type(item) is Consumer:
        return {
            "name": item.name,
            "phone": item.phone,
            "email": item.email,
            "isActive": bool(item.isActive)
        }
    else:
        return {
            "name": item[1],
            "phone": item[2],
            "email": item[3],
            "isActive": str(item[4])
        }

def consumersEntity(entity) -> list:
    return [consumerEntity(item) for item in entity]