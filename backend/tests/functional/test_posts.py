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

'''def test_post_update():
    """
    Check if the post has been updated 
    with a successful status"""
    
    flask_app = create_app(Config)
    with flask_app.test_client() as test_client:
        data={"title": "title_new", "content": "content_new",
            "user_id": 2, "file":"worker.jpg"}
        data = {key: str(value) for key, value in data.items()}
        data['file'] = (io.BytesIO(b"abcdef"), 'test.jpg')
        response = test_client.post("/posts/updatePost/28", 
        data=data,follow_redirects = True,
        content_type='multipart/form-data')
        assert response.status_code == 201'''

def test_non_existent_post_update():
    """
    Check if updating a post that does not exist
    gives invalid response"""
    flask_app = create_app(Config)
    with flask_app.test_client() as test_client:
        data={"title": "title_new", "content": "content_new",
            "user_id": 2, "file":"worker.jpg"}
        data = {key: str(value) for key, value in data.items()}
        data['file'] = (io.BytesIO(b"abcdef"), 'test.jpg')
        response = test_client.post("/posts/updatePost/100", 
        data=data,follow_redirects = True,
        content_type='multipart/form-data')
        assert response.status_code == 401

'''def test_post_deletion():
    """
    Check if the post is deleted
    with a successful status"""
    flask_app = create_app(Config)
    with flask_app.test_client() as test_client:
        response = test_client.delete("/posts/deletePost/28")
        assert response.status_code == 201'''

def test_non_existent_post_deletion():
    """
    Check if a non existent post
    gives unsuccessful status"""
    flask_app = create_app(Config)
    with flask_app.test_client() as test_client:
        response = test_client.delete("/posts/deletePost/28")
        assert response.status_code == 401


def test_valid_comment_creation():
    """
    Given the valid inputs
    When the /makeComment page is requested(POST)
    Then check response is valid"""

    flask_app = create_app(Config)

    with flask_app.test_client() as test_client:
        data={"post_id":1, "content": "content",
            "user_id": 2}
        data = {key: str(value) for key, value in data.items()}
        response = test_client.post("/posts/makeComment", 
        data=data,follow_redirects = True,
        content_type='multipart/form-data')
        
        assert response.status_code == 201

def test_comments_by_post_retrieve():
    """
    Check if all the posts are retrieved
    with a successful status"""

    flask_app = create_app(Config)

    with flask_app.test_client() as test_client:
        response = test_client.get("/posts/getCommentByPost/1")
        assert response.status_code == 200

def test_comments_by_user_retrieve():
    """
    Check if all the posts are retrieved
    with a successful status"""

    flask_app = create_app(Config)

    with flask_app.test_client() as test_client:
        response = test_client.get("/posts/getCommentByUser/1")
        assert response.status_code == 200


def test_comment_update():
    """
    Check if the post has been updated 
    with a successful status"""
    
    flask_app = create_app(Config)
    with flask_app.test_client() as test_client:
        data={"content": "content_new"}
        data = {key: str(value) for key, value in data.items()}
        response = test_client.post("/posts/updateComment/1", 
        data=data,follow_redirects = True,
        content_type='multipart/form-data')
        assert response.status_code == 201

def test_non_existing_comment_update():
    """
    Check if the post has been updated 
    with a successful status"""
    
    flask_app = create_app(Config)
    with flask_app.test_client() as test_client:
        data={"content": "content_new"}
        data = {key: str(value) for key, value in data.items()}
        response = test_client.post("/posts/updateComment/9000", 
        data=data,follow_redirects = True,
        content_type='multipart/form-data')
        assert response.status_code == 401


def test_non_existent_post_deletion():
    """
    Check if a non existent post
    gives unsuccessful status"""
    flask_app = create_app(Config)
    with flask_app.test_client() as test_client:
        response = test_client.delete("/posts/deletePost/9000")
        assert response.status_code == 401


def test_post_likes():
    """
    Check if a non existent post
    gives unsuccessful status"""
    flask_app = create_app(Config)
    with flask_app.test_client() as test_client:
        response = test_client.post("/posts/likePost/1")
        assert response.status_code == 201

def test_post_unlikes():
    """
    Check if a non existent post
    gives unsuccessful status"""
    flask_app = create_app(Config)
    with flask_app.test_client() as test_client:
        response = test_client.post("/posts/unlikePost/1")
        assert response.status_code == 201

def test_nonexisting_post_likes():
    """
    Check if a non existent post
    gives unsuccessful status"""
    flask_app = create_app(Config)
    with flask_app.test_client() as test_client:
        response = test_client.post("/posts/likePost/1000")
        assert response.status_code == 401

def test_nonexisting_post_unlikes():
    """
    Check if a non existent post
    gives unsuccessful status"""
    flask_app = create_app(Config)
    with flask_app.test_client() as test_client:
        response = test_client.post("/posts/unlikePost/1000")
        assert response.status_code == 401


