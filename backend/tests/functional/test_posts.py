from app import create_app
from config import Config
import json
from dotenv import load_dotenv
import os
import io

def test_valid_post_creation():
    """
    Given the valid inputs
    When the /createPost page is requested(POST)
    Then check response is valid"""

    flask_app = create_app(Config)

    with flask_app.test_client() as test_client:
        data={"title": "title", "content": "content",
            "user_id": 2, "file":"worker.jpg"}
        data = {key: str(value) for key, value in data.items()}
        data['file'] = (io.BytesIO(b"abcdef"), 'test.jpg')
        response = test_client.post("/posts/createPost", 
        data=data,follow_redirects = True,
        content_type='multipart/form-data')
        
        assert response.status_code == 201


def test_missing_file_input():
    """
    If the input params have file missing
    Then check the response is invalid"""

    flask_app = create_app(Config)

    with flask_app.test_client() as test_client:
        data={"title": "title", "content": "content",
            "user_id": 2}
        data = {key: str(value) for key, value in data.items()}
        response = test_client.post("/posts/createPost", 
        data=data,follow_redirects = True,
        content_type='multipart/form-data')
        
        assert response.status_code == 401


def test_filename_empty():
    """
    If the input params have file with blank name
    Then check the response is invalid"""

    flask_app = create_app(Config)

    with flask_app.test_client() as test_client:
        data={"title": "title", "content": "content",
            "user_id": 2, "file":""}
        data = {key: str(value) for key, value in data.items()}
        data['file'] = (io.BytesIO(b"abcdef"), '')
        response = test_client.post("/posts/createPost", 
        data=data,follow_redirects = True,
        content_type='multipart/form-data')
        
        assert response.status_code == 401


def test_all_posts_retrieve():
    """
    Check if all the posts are retrieved
    with a successful status"""

    flask_app = create_app(Config)

    with flask_app.test_client() as test_client:
        response = test_client.get("/posts/retrievePost/")
        assert response.status_code == 200


def test_one_post_retrieve():
    """
    Check if all the posts are retrieved
    with a successful status"""

    flask_app = create_app(Config)

    with flask_app.test_client() as test_client:
        response = test_client.get("/posts/retrievePost/1")
        assert response.status_code == 200