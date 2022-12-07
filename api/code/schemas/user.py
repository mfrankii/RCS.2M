from models.User import User

def userEntity(item) -> dict:
    if type(item) is User:
        return {
            "user_id": item.user_id,
            "userName": item.userName,
            "email": item.email,
            "password": item.password,
            "plan_id": item.plan_id,
        }
    else:
        return {
            "user_id":str(item[0]),
            "userName":item[1],
            "email":item[2],
            "password": item[3],
            "plan_id": item[4],
        }

# TODO: imp
def hash(password) -> str:
    return password

def usersEntity(entity) -> list:
    return [userEntity(item) for item in entity]