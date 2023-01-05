from models.Consumer import Consumer

def consumerEntity(item) -> dict:
    if type(item) is Consumer:
        return {
            "consumer_id": item.consumer_id,
            "name": item.name,
            "phone": item.phone,
            "email": item.email,
            "isActive": bool(item.isActive)
        }
    else:
        return {
            "consumer_id": str(item[0]),
            "name": item[1],
            "phone": item[2],
            "email": item[3],
            "isActive": str(item[4])
        }

def consumersEntity(entity) -> list:
    return [consumerEntity(item) for item in entity]