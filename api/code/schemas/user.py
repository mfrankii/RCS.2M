from models.User import User
import hmac
import hashlib
import random

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


def hash(password: str) -> str:
    # Generate a random salt
    salt = str(random.getrandbits(128))

    # Use HMAC to hash the password with the salt
    password_hash = hmac.new(salt.encode(), password.encode(), hashlib.sha256).hexdigest()

    # Return the salt and the hash as one string
    return salt + password_hash


# TODO: imp
def usersEntity(entity) -> list:
    return [userEntity(item) for item in entity]