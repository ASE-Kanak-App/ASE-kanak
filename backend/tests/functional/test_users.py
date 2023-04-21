from app import create_app
from config import Config
import json
from dotenv import load_dotenv
import os

######## Signup #######

def test_user_registration():
    """
    Given the valid details
    When the /signup page is requested(POST)
    Then check the response is valid"""

    flask_app = create_app(Config)

    with flask_app.test_client() as test_client:
        response = test_client.post("/auth/signup",  
                                    data={"email" : 'lucifer@gmail.com', "firstname" : 'lucifer', 
                                    "username" : 'lucifer', "lastname" : 'user',
                                    "password" : 'lucifer', "intro" : 'intro', "phone" : '12345'})
        assert response.status_code == 201 or response.status_code == 202
        assert b"User registered successfully" in response.data or b"Error occured, user already exists" in response.data

def test_existing_user():
    """
    Verify that a user cannot re-register 
    with existing credentials
    """
    flask_app = create_app(Config)
    with flask_app.test_client() as test_client:
        response = test_client.post("/auth/signup",  
                                    data={"email" : 'lucifer@gmail.com', "firstname" : 'lucifer', 
                                    "username" : 'lucifer', "lastname" : 'user',
                                    "password" : 'lucifer', "intro" : 'intro', "phone" : '12345'})
        assert response.status_code == 202
        assert b"Error occured, user already exists" in response.data

def verify_max_min_credential_length():
    """
    Verify that the minimum and maximum lengths 
    of username and password is enforced.
    """
    flask_app = create_app(Config)
    with flask_app.test_client() as test_client:
        response = test_client.post("/auth/signup",  
                                    data={"email" : 'hans@gmail.com', "firstname" : 'Hans', 
                                    "username" : 'hans', "lastname" : 'user',
                                    "password" : 'H', "intro" : 'intro', "phone" : '12987'})
        assert response.status_code == 401
        assert b"incorrect password length" in response.data
       
####### Login ########

def test_correct_existing_credentials():
    """
    Given correct credentials, 
    check if the user is able to login
    """
    flask_app = create_app(Config)
    with flask_app.test_client() as test_client:
        response = test_client.post("/auth/login",  
                                    data={"email" : 'lucifer@gmail.com',
                                    "password" : 'lucifer'})
        assert response.status_code == 201
        assert response.data is not None

def test_incorrect_password_credentials():
    """
    Given incorrect credentials,
    check if the user is unable to login
    """
    flask_app = create_app(Config)
    with flask_app.test_client() as test_client:
        response = test_client.post("/auth/login",  
                                    data={"email" : 'lucifer@gmail.com',
                                    "password" : 'lucier'})
        assert response.status_code == 403
        assert b"Wrong Password!" in response.data

def test_non_existent_user():
    """
    Given non existing credentials,
    check if the user is unable to login
    """
    flask_app = create_app(Config)
    with flask_app.test_client() as test_client:
        response = test_client.post("/auth/login",  
                                    data={"email" : 'abcd@gmail.com',
                                    "password" : 'abcdef'})
        assert response.status_code == 401
        assert b"Could not Verify, user does not exists" in response.data

def test_empty_credentials():
    """
    Given empty credentials, 
    check if the user gets an error message
    """
    flask_app = create_app(Config)
    with flask_app.test_client() as test_client:
        response = test_client.post("/auth/login",  
                                    data={"email" : 'lucifer@gmail.com',
                                    "password" : None})
        assert response.status_code == 401
        assert b"Could not Verify, Login Required! Misssing Fields" in response.data


####### Logout ########
def test_logout():
    """
    Test if the user is able to logout
    """
    load_dotenv()

    headers = {'Authorization': os.getenv('AUTH')}
    flask_app = create_app(Config)
    with flask_app.test_client() as test_client:
        response = test_client.delete("/auth/logout", headers=headers)
    assert b"JWT revoked - Logout successful" in response.data

####### Retrieve User ########
def test_user_retrieve():
    """
    Test if the user is able to logout
    """
    flask_app = create_app(Config)
    with flask_app.test_client() as test_client:
        response = test_client.get("/auth/getUserId/?email=akshay@gmail.com")
    assert b"email" in response.data


####### Testing follow/unfollowing of users ########

def test_follow_users():
    """
    Test if a particular user can be followed
    and gives successful status"""
    flask_app = create_app(Config)
    with flask_app.test_client() as test_client:
        response = test_client.post("/auth/follow/",  
                                    data={"email" : 'lucifer@gmail.com',
                                    "username" : 'lucifer'})
        assert response.status_code == 201
        assert b"Followed successfully" in response.data

def test_follow_for_non_existent_users():
    """
    Test if a user wants to follow a non-existent user
    it gives an unsuccessful status"""
    flask_app = create_app(Config)
    with flask_app.test_client() as test_client:
        response = test_client.post("/auth/follow/",  
                                    data={"email" : 'xyz@gmail.com',
                                    "username" : 'xyz'})
        assert response.status_code == 401
        assert b"User cannot be none" in response.data

def test_follow_for_already_following_users():
    """
    Test if a user wants to refollow an already folllowing user
    it gives an  unsuccessful status"""
    flask_app = create_app(Config)
    with flask_app.test_client() as test_client:
        response = test_client.post("/auth/follow/",  
                                    data={"email" : 'lucifer@gmail.com',
                                    "username" : 'lucifer'})
        assert response.status_code == 402
        assert b"You are already following" in response.data

def test_unfollow_user():
    """
    Test for a given user 
    if they want to unfollow a followed user
    it gives a successful status
    """
    flask_app = create_app(Config)
    with flask_app.test_client() as test_client:
        response = test_client.post("/auth/unfollow/",  
                                    data={"email" : 'lucifer@gmail.com',
                                    "username" : 'lucifer'})
        assert response.status_code == 201
        assert b"Unfollowed successfully" in response.data

def test_non_existent_user_follower():
    """
    Test if a user wants to unfollow a non existent user
    it gives an unsuccessful status"""
    flask_app = create_app(Config)
    with flask_app.test_client() as test_client:
        response = test_client.post("/auth/unfollow/",  
                                    data={"email" : 'xyz@gmail.com',
                                    "username" : 'xyz'})
        assert response.status_code == 401
        assert b"User cannot be none" in response.data

def test_unfollowing_an_unfollowed_user():
    """
    Test if a user wants to unfollow 
    another user they dont follow
    it gives an unsuccessful status
    """
    flask_app = create_app(Config)
    with flask_app.test_client() as test_client:
        response = test_client.post("/auth/unfollow/",  
                                    data={"email" : 'lucifer@gmail.com',
                                    "username" : 'lucifer'})
        assert response.status_code == 402
        assert b"You are not following" in response.data

    """"
    def test_getting_follower_list():
    # Test that if you pass a certain user ID
    # you get a successful status and a list of followers
    flask_app = create_app(Config)
    with flask_app.test_client() as test_client:
        response = test_client.get("/getFollowers/1")
        assert response.status_code == 201
        assert response.data is not None
    """""
