from app import create_app
from config import Config
import json

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
        assert response.status_code == 401
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
    flask_app = create_app(Config)
    with flask_app.test_client() as test_client:
        response = test_client.post("/auth/logout")
    assert b"JWT revoked - Logout successful" in response.data

# def test_redirection():
#     """
#     Test if user is able to go to the login page after logging out
#     """
#     return

# def test_session_expiry():
#     """
#     Verify if the user is automatically logged out after their session expiry
#     """
#     return