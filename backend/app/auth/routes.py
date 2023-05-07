from flask_restful.fields import Integer

from app.auth import bp
from app.extensions import db
from flask import jsonify, make_response, request
from werkzeug.security import generate_password_hash, check_password_hash
from app.auth.utils import encode_token
from app.models.models import User, TokenBlockList, Follow, Post
from flask_jwt_extended import get_jwt
from flask_jwt_extended import jwt_required
from datetime import datetime, timezone
from dotenv import load_dotenv

import os
import jwt

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

    print(auth)

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
        return make_response(jsonify({'token' : token}), 201)

    # returns 403 if password is wrong
    resp = {
        "status": "Error",
        "message": "Wrong Password!"
    }
    return make_response(jsonify(resp)), 403


@bp.route('/logout', methods=['DELETE'])
@jwt_required()
def logout():
    auth = request.form
    print("auth", auth)
    jti = auth.get('token')
    print(jti)
    now = datetime.now(timezone.utc)
    db.session.add(TokenBlockList(jti=jti, created_at=now))
    db.session.commit()
    return make_response(jsonify(msg="JWT revoked - Logout successful"))

@bp.route('/getUserId/', methods=['GET'])
def getUser():
    args = request.args
    email = args.get('email')

    if not email:
        resp = {
            "status": "Error",
            "message": "Please give an email to retrieve"
        }
        return make_response(jsonify(resp))

    user = User.query.filter_by(email=email).first()

    if user:
        return make_response(jsonify(user.obj_to_dict()))
    else:
        resp = {
            "status": "Error",
            "message": "Could not retrieve, user does not exists"
        }
        return make_response(jsonify(resp))

@bp.route('/getUserName/', methods=['GET'])
def getUserById():
    args = request.args
    user_id = int(args.get('user_id'))

    user = User.query.get(user_id)

    if user:
        return make_response(jsonify(user.obj_to_dict()))
    else:
        resp = {
            "status": "Error",
            "message": "Could not retrieve, user does not exists"
        }
        return make_response(jsonify(resp))


@bp.route('/editUserInfo/', methods = ['POST'])
def edit_user_info():


    user = User.query.filter_by(email = request.form['email']).first()

    if not user:
        resp = {
                    'status': 'not successful ',
                    'message': 'user does not exist test'
                }
        return make_response(jsonify(resp)), 401

   if len(request.form['password'])<5 or len(request.form['password'])>100:
           resp = {
               'status': 'not successful',
               'message': 'incorrect password length'
           }
           return make_response(jsonify(resp)), 402

       if len(request.form['email'])==0 or len(request.form['email'])>100:
           resp = {
               'status': 'not successful',
               'message': 'incorrect email length'
           }
           return make_response(jsonify(resp)), 403

    user.email = request.form['email']
    user.username = request.form['username']
    user.firstname = request.form['firstname']
    user.lastname = request.form['lastname']
    user.intro = request.form['intro']
    user.phone = request.form['phone']

    hashed_password = generate_password_hash(request.form['password'])
    assert hashed_password != request.form['password']
    user.password = hashed_password
    db.session.add(user)
    db.session.commit()

    resp = {
        'status': 'success',
        'message': 'User Information edited successfully'
    }

    return make_response(jsonify(resp)), 201


@bp.route('/follow/', methods=['POST'])
def follow():
    email = request.form['email']
    username = request.form['username']

    current_user = User.query.filter_by(email=email).first()
    user = User.query.filter_by(username=username).first()
    if user is None:
        resp = {
            "status": "Error",
            "message": "User cannot be none"
        }
        return make_response(jsonify(resp)), 401

    if current_user.is_following(user):
        resp = {
            "status": "Error",
            "message": "You are already following"
        }
        return make_response(jsonify(resp)), 402
    current_user.follow(user)
    db.session.commit()
    resp = {
            "status": "Success",
            "message": "Followed successfully"
    }
    return make_response(jsonify(resp)), 201


@bp.route('/unfollow/', methods=['POST'])
def unfollow():
    email = request.form['email']
    username = request.form['username']

    current_user = User.query.filter_by(email=email).first()
    user = User.query.filter_by(username=username).first()
    if user is None:
        resp = {
            "status": "Error",
            "message": "User cannot be none"
        }
        return make_response(jsonify(resp)), 401
    if not current_user.is_following(user):
        resp = {
            "status": "Error",
            "message": "You are not following"
        }
        return make_response(jsonify(resp)), 402
    current_user.unfollow(user)
    db.session.commit()
    resp = {
            "status": "Success",
            "message": "Unfollowed successfully"
    }
    return make_response(jsonify(resp)), 201


@bp.route('/getFollowers/<int:id>', methods=['GET'])
def get_followers(id):
    followers = Follow.query.filter_by(followed_id=id).all()
    all_followers = list()
    for follower in followers:
        all_followers.append(follower.obj_to_dict())

    return make_response(jsonify(all_followers)), 201

@bp.route('/getFollowedUserPosts/<int:id>', methods = ['GET'])
def get_followed_user_posts(id):
    followed_users = Follow.query.filter_by(follower_id=id).all()
    all_posts = list()
    for user in followed_users:
        id = user.followed_id
        posts = Post.query.filter_by(user_id=id).all()
        for post in posts:
            all_posts.append(post.obj_to_dict())
    return make_response(jsonify(all_posts)), 201
