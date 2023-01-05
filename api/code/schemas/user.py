from models.User import User
import bcrypt

def userEntity(item) -> dict:
    if type(item) is User:
        return {
            "user_id": item.user_id,
            "userName": item.userName,
            "email": item.email,
            "password": item.password
        }
    else:
        return {
            "user_id":str(item[0]),
            "userName":item[1],
            "email":item[2],
            "password": item[3]
        }


def hash(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

def validate_password(password: str, password_hash: str) -> bool:
    return bcrypt.hashpw(password.encode('utf-8'), password_hash.encode('utf-8')) == password_hash.encode('utf-8')

def usersEntity(entity) -> list:
    return [userEntity(item) for item in entity]