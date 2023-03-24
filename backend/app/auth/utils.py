from datetime import datetime, timedelta
import jwt
import app
from app.extensions import db
from app.models.models import TokenBlockList
from config import Config
from app import JWTManager
from dotenv import load_dotenv

import os

def encode_token(user_id):
    payload ={
        'exp': datetime.utcnow() + timedelta(days=1, seconds=5 ),
        'iat': datetime.utcnow(),
        'sub': user_id
        
    }
    load_dotenv()
    token = jwt.encode(payload = payload, key = os.getenv('SECRET'), algorithm= 'HS256')
    return token

jwt_app = JWTManager()
@jwt_app.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    token = db.session.query(TokenBlockList.id).filter_by(jti=jti).scalar()

    return token is not None