from datetime import datetime, timedelta
import jwt
import app
from app.extensions import db
from app.models.models import TokenBlockList
from config import Config
from app import JWTManager
from dotenv import load_dotenv

import os

"""
Function for encoding a token
Input:
    - UserId of a given registered user
Functionalities:
    - The function encodes the token using a Secret Key.
    - The encoded elements include expiration time of the token, 
      time of encoding the token, and the user Id associated with the token.
    - Formed when users logs into their account.
Output:
    - JWT Token associated with the User Id is returned.
"""
def encode_token(user_id):
    payload ={
        'exp': datetime.utcnow() + timedelta(days=1, seconds=5 ),
        'iat': datetime.utcnow(),
        'sub': user_id
        
    }
    load_dotenv()
    token = jwt.encode(payload = payload, key = os.getenv('SECRET'), algorithm= 'HS256')
    return token

"""
Function for checking if a particular token is in the Blocklist
Input:
    - JWT token
Functionalities:
    - Queries the TokenBlockList Table in the database for its presence.
Output:
    - Token if the Token is present in the TokenBlockList table.
"""
jwt_app = JWTManager()
@jwt_app.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    token = db.session.query(TokenBlockList.id).filter_by(jti=jti).scalar()

    return token is not None