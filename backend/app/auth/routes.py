from app.auth import bp
from app.extensions import db   
from flask import jsonify, make_response, request
from werkzeug.security import generate_password_hash, check_password_hash
from app.auth.utils import encode_token
from app.models.models import User, TokenBlockList
from flask_jwt_extended import get_jwt
from flask_jwt_extended import jwt_required
from datetime import datetime, timezone
import jwt
import os
from dotenv import load_dotenv

@bp.route('/signup', methods = ['POST'])
def register():
    user = User.query.filter_by(email = request.form['email']).first()

    if not user:
        try:
            if len(request.form['password'])<5 or len(request.form['password'])>100:
                resp = {
                    'status': 'not successful',
                    'message': 'incorrect password length'
                }
                return make_response(jsonify(resp)), 401
            
            if len(request.form['email'])==0 or len(request.form['email'])>100:
                resp = {
                    'status': 'not successful',
                    'message': 'incorrect email length'
                }
                return make_response(jsonify(resp)), 401

            hashed_password = generate_password_hash(request.form['password'])
            assert hashed_password != request.form['password']
            user = User(email = request.form['email'], username = request.form['username'],
                        firstname=request.form['firstname'], lastname = request.form['lastname'],
                        password = hashed_password, intro = request.form['intro'], phone = request.form['phone'])
            
            db.session.add(user)
            db.session.commit()

            resp = {
                'status': 'success',
                'message': 'User registered successfully'
            }

            return make_response(jsonify(resp)), 201

        except Exception as e:
            resp = {
                "status": "Error",
                "message": "Error occured, user registration failed"
            }

            return make_response(jsonify(resp)), 401
        
    else:
        resp = {
            "status": "Error",
            "message": "Error occured, user already exists"
        }

        return make_response(jsonify(resp)), 202



@bp.route('/login', methods = ['POST'])
def login():

    # creates dictionary of form data
    auth = request.form
  
    if not auth or not auth.get('email') or not auth.get('password'):
        # returns 401 if any email or / and password is missing
        resp = {
            "status": "Error",
            "message": "Could not Verify, Login Required! Misssing Fields"
        }
        return make_response(jsonify(resp)), 401

    user = User.query.filter_by(email = request.form['email']).first()
    if not user:
        # returns 401 if user does not exist
        resp = {
            "status": "Error",
            "message": "Could not Verify, user does not exists"
        }
        return make_response(jsonify(resp)), 401
  
    if check_password_hash(user.password, auth.get('password')):
        # generates the JWT Token
        token = encode_token(user.id)  
        load_dotenv()
        return make_response(jsonify({'token' : jwt.decode(jwt=token, key=os.getenv('SECRET'), algorithms=["HS256"])}), 201)
    
    # returns 403 if password is wrong
    resp = {
        "status": "Error",
        "message": "Wrong Password!"
    }
    return make_response(jsonify(resp)), 403


@bp.route('/logout', methods=['DELETE'])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    now = datetime.now(timezone.utc)
    db.session.add(TokenBlockList(jti=jti, created_at=now))
    db.session.commit()
    return make_response(jsonify(msg="Access Token revoked - Logout successful"))

# @bp.route("/protected", methods=["GET"])
# @jwt_required()
# def protected():
#     return make_response(jsonify(msg="Access revoked"))

