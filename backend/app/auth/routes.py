from app.auth import bp
from app.extensions import db   
from flask import jsonify, make_response, request
from werkzeug.security import generate_password_hash, check_password_hash
from app.auth.utils import encode_token
from app.models.models import User


@bp.route('/signup', methods = ['POST'])
def register():
    user = User.query.filter_by(email = request.form['email']).first()

    if not user:
        try:
            hashed_password = generate_password_hash(request.form['password'])
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



@bp.route('/login')
def login():
    return 'login'


@bp.route('/logout')
def logout():
    return 'logout'