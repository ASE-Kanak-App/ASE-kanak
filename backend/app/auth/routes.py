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
    """
    Function for signing up a new user.
    Inputs:
        - Email: Between 5 to 100 characters
        - Password: Between 5 to 100 characters
        - Username
        - Firstname
        - Lastname
        - Intro
        - Phone
    Functionalities:
        - The User's respective details are added to the User table in the database if they do not exists.
        - A successful status depicts user has been registered.
    Output:
        - Successful Registration, 201; or
        - Unsuccessful Registration: Existent User, 202; or
        - Unsuccessful Registation: Error, 401
    """
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
    """
    Function for logging in a user.
    Inputs:
        - Registered Email
        - Password
    Functionalities:
        - The function verifies that the email exists in the User Table in the database.
        - It also verifies if the password is correct for the given email.
    Output:
        - Successful login with a Token, 201; or
        - Unsuccessful login, non-existing user/ missing fields, 401; or
        - Unsuccessful login, wrong password, 403
    """
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
    """
    Function for logging out a User
    Input:
        - User Login Token
    Functionalities:
        - The Function adds the token to the TokenBlockList to prevent reuse of the same token.
        - The user is successfully logged out.
    Output:
        - Successful logout status.
    """
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
    """
    Function for obtaining the unique User Id of the user from the email
    Inputs:
        - Existing User Email
    Functionalities:
        - The function checks the presence of the email in the User table of the Database.
        - Return the corresponding dictionary listing the User Id, Email and Username.
    Output:
        - Dictionary containing the User Id, Email and Username of the user.; or
        - Error, no email provided; or
        - Unsuccessful status, non-existing user
    """
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
    """
    Function for obtaining the username from a given User Id.
    Inputs:
        - Existing User Id
    Functionalities:
        - The function checks the presence of the User Id in the User table of the Database.
        - Return the corresponding dictionary listing the User Id, Email and Username.
    Output:
        - Dictionary containing the User Id, Email and Username of the user.; or
        - Error, non-existing user
    """
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
    """
    Function for editing the Existing User Information
    Inputs:
        - Email: Between 5 to 100 characters
        - Password: Between 5 to 100 characters
        - Username
        - Firstname
        - Lastname
        - Intro
        - Phone
    Functionalities:
        - The function checks for the existing user through email in the User table in the Database.
        - All the input user variables are overwritten in the User Table in the database.
    Output:
        - Sucessful status, 201; or
        - Unsuccessful status, non existing user, 401; or
        - Unsuccessful status, incorrect password/email length, 402; or
    """
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
    """
    Function for following another user.
    Inputs:
        - Email of the current user
        - Username of the user the current user wants to follow
    Functionalities:
        - The function checks for the existence of the user in the User Table of the Database.
        - The function checks if the current user is already following the user.
        - If the current user does not already follow the user, it does so now successfully.
    Output:
        - Successful status, 201; or
        - Unsuccessful status, incorrect user, 401; or
        - Unsuccessful status, already following, 402
    """
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
    """
    Function for unfollowing another user.
    Inputs:
        - Email of the current user
        - Username of the user the current user wants to unfollow
    Functionalities:
        - The function checks for the existence of the user in the User Table of the Database.
        - The function checks if the current user is already unfollowing the user.
        - If the current user does not already unfollow the user, it does so now successfully.
    Output:
        - Successful status, 201; or
        - Unsuccessful status, incorrect user, 401; or
        - Unsuccessful status, already unfollowing, 402
    """
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
    """
    Function for getting the followers of a given User Id
    Input:
        - Existing User Id
    Functionalities:
        - The function checks for the followers using the Id in the Follow Table of the Database.
        - Returns a dictionary with followed and following User Ids.
    Output:
        - Dictionary containing the follower and followed User Ids, 201
    """
    followers = Follow.query.filter_by(followed_id=id).all()
    all_followers = list()
    for follower in followers:
        all_followers.append(follower.obj_to_dict())

    return make_response(jsonify(all_followers)), 201


@bp.route('/getFollowedUserPosts/<int:id>', methods = ['GET'])
def get_followed_user_posts(id):
    """
    Function for retrieving posts from followers for a given User Id.
    Input:
        - User Id
    Functionalities:
        - The function obtains all the followed users for the User Id.
        - It iterates through all the followed users and extracts their posts.
        - Returns a list of all posts from the followed users.
    Output:
        - List of all posts from followed Users, 201
    """
    followed_users = Follow.query.filter_by(follower_id=id).all()
    all_posts = list()
    for user in followed_users:
        id = user.followed_id
        posts = Post.query.filter_by(user_id=id).all()
        for post in posts:
            all_posts.append(post.obj_to_dict())
    return make_response(jsonify(all_posts)), 201