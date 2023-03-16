from app import create_app
from config import Config
import json

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