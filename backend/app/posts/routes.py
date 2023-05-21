import time

from app.posts import bp
from app.extensions import db
from app.models.models import Post, Comment
from flask import jsonify, request, make_response
from flask_login import login_user, logout_user, current_user, login_required, LoginManager
from werkzeug.utils import secure_filename
from app.posts.utils import allowed_file
import os
from config import Config

@bp.route('/retrievePost/')
def retrieve():
    """
    Function for retrieving all posts
    Output:
        - List of all posts
    """
    posts = Post.query.all()    
    all_posts = list()
    for post in posts:
        all_posts.append(post.obj_to_dict())

    return make_response(jsonify(all_posts)), 200

@bp.route('/retrievePost/<int:id>')
def retrieve_post(id):
    """
    Function for retrieving details of a post from its post id
    Input:
        - Post Id
    Output:
        - Dictionary containing the post id, title, content, file, likes and comments.
    """
    post = Post.query.filter_by(id=id).first_or_404()
    return jsonify(post.obj_to_dict())

@bp.route('/retrieveUserPosts/<int:id>', methods = ['GET'])
def retrieve_user_posts(id):
    """
    Function for retrieving all the posts made by a given User Id
    Input:
        - User Id
    Functionalities:
        - The Function queries the Post table for all posts created by a User Id
        - It returns a list of all posts created by the user
    Output:
        - List of all posts, 201
    """
    posts = Post.query.filter_by(user_id=id).all()
    all_posts = list()
    for post in posts:
        all_posts.append(post.obj_to_dict())
    return make_response(jsonify(all_posts)), 201

@bp.route('/createPost/', methods = ['POST'])
def create_post():
    """
    Function for creating a post by a User
    Input:
        - user_id: User Id of the user creating the post
        - title: title of the post
        - content: Written content associated with the post
        - file: The multimedia file for the post
    Functionalities:
        - A valid file is to be provided for creating a post
        - File name does not have to be null
        - The input contents are added to the Post table in the database for successful post creation
    Output:
        - Dictionary with the details of the post, 201; or
        - Not successful status, invalid file request, 401; or
        - Not sucessful status, invalid filename, 401
    """
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            resp = {
                    'status': 'not successful',
                    'message': 'Invalid Request'
            }
            return make_response(jsonify(resp)), 401
        
        file = request.files['file']

        # If the user does not select a file, the browser submits an
        # empty file without a filename.

        if file.filename == '':
            resp = {
                    'status': 'not successful',
                    'message': 'File cannot be null'
            }
            return make_response(jsonify(resp)), 401
        
        if file and allowed_file(file.filename):
            #create a unique filename not stored in the database

            file_name, file_extension = os.path.splitext(file.filename)
            user_id = request.form['user_id']
            timestamp = time.time()
            filename = secure_filename(file_name + str(timestamp) + str(user_id) + file_extension)
            print(filename)

            post = Post(title = request.form['title'], content = request.form['content'],
                user_id = request.form['user_id'], mimetype = filename)
            
            file.save(os.path.join(os.environ.get('UPLOAD_FOLDER'), filename))
            db.session.add(post)
            db.session.commit()

            return make_response(jsonify(post.obj_to_dict())), 201

@bp.route('/updatePost/<int:id>', methods = ['POST'])
def update_post(id):
    """
    Function for updating an existing post
    Inputs:
        - id: Post_id of the post
        - title: Edited title of the post
        - content: Edited content of the post
        - user_id: The user who created the post
        - file: Edited file of the post
    Functionalities:
        - The function queries the Post table using the post_id
        - The variables of the post are overwritten in the Post table
    Output:
        - Successful status, 201; or
        - Unsuccessful status, invalid post, 401; or
        - Unsuccessful status, invalid file, 401
    """
    post = db.session.get(Post, id)
    if post is None:
        resp = {
            'status': 'not successful',
            'message': 'Post not found'
        }
        return make_response(jsonify(resp)), 401
    
    post.title = str(request.form['title'])
    post.content = str(request.form['content'])
    post.user_id = int(request.form['user_id'])

    file = request.files['file']
    if file:
        if file.filename == '':
            resp = {
                    'status': 'not successful',
                    'message': 'File cannot be null'
            }
            return make_response(jsonify(resp)), 401
        
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            post.mimetype = filename
    
    db.session.add(post)
    db.session.commit()
    resp = {
        'status': "Successful",
        'message': 'Your post has been edited'
    }
    return make_response(jsonify(resp)), 201

@bp.route('/deletePost/<int:id>', methods = ['DELETE'])
def delete_post(id):
    """
    Function for deleting a post
    Inputs:
        - id: Post_id of the post to be deleted
    Functionalities:
        - The function queries the Post table in the database using the post_id and deletes the post
    Output:
        - Successful status, 201; or
        - unsuccessful status, invalid post, 401
    """
    post = db.session.get(Post, id)
    if post is None:
        resp = {
            'status': 'not successful',
            'message': 'Post not found'
        }
        return make_response(jsonify(resp)), 401

    db.session.delete(post)
    db.session.commit()
    resp = {
        'status': 'Successful',
        'message': 'Post deleted successfully'
    }
    return make_response(jsonify(resp)), 201

@bp.route('/makeComment/', methods = ['POST'])
def make_comment():
    """
    Function for making a comment on a post
    Inputs:
        - post_id: Id of the post on which the comment has to be made
        - user_id: Id of the user making the comment
        - content: The content of the comment
    Functionalities:
        - The function adds the input details to the Comment table in the database
    Output:
        - A dictionary containing the details of the comment is returned, 201
    """
    comment = Comment(post_id = request.form['post_id'], content = request.form['content'],
                user_id = request.form['user_id'])
    db.session.add(comment)
    db.session.commit()

    return make_response(jsonify(comment.obj_to_dict())), 201

@bp.route('/getCommentByPost/<int:id>', methods = ['GET'])
def get_comments_by_post(id):
    """
    Function for obtaining the comments on a post
    Inputs:
        - id: post_id of the post
    Functionalities:
        - The function queries over the Comment table in the database using the post_id
    Output:
        - A dictionary containing the comment and the respective user_id is returned, 200
    """
    comments = Comment.query.filter_by(post_id=id).all()
    
    all_comments = list()
    for comment in comments:
        all_comments.append(comment.obj_to_dict())

    return make_response(jsonify(all_comments)), 200

@bp.route('/getCommentByUser/<int:id>', methods = ['GET'])
def get_comments_by_user(id):
    """
    Functions for obtaining comments made by a user
    Inputs:
        - id: User_id of the user
    Functionalities:
        - The function queries the Comment table in the database using the user_id
    Output:
        - A list of comments and its details is returned, 200
    """
    comments = Comment.query.filter_by(user_id=id).all()
    
    all_comments = list()
    for comment in comments:
        all_comments.append(comment.obj_to_dict())

    return make_response(jsonify(all_comments)), 200

@bp.route('/deleteComment/<int:id>', methods = ['DELETE'])
def delete_comment(id):
    """
    Function for deleting a comment
    Input:
        - id: Comment Id of the comment to be deleted
    Functionalities:
        - The function queries the Comment table in the database using the comment id and deletes the comment
    Output:
        - Successful status, 201; or
        - Unsuccessful status, non existing comment, 401
    """
    comment = db.session.get(Comment, id)
    if comment is None:
        resp = {
            'status': 'not successful',
            'message': 'Comment'
        }
        return make_response(jsonify(resp)), 401

    db.session.delete(comment)
    db.session.commit()
    resp = {
        'status': 'Successful',
        'message': 'Comment deleted successfully'
    }
    return make_response(jsonify(resp)), 201

@bp.route('/updateComment/<int:id>', methods = ['POST'])
def update_comment(id):
    """
    Function for updating a comment
    Input:
        - id: Comment_id of the post
        - content: Edited content of the comment
    Functionalities:
        - The function queries the Comment table in the database using the comment id
        - The content of the comment is overwritten with the edited content
    Output:
        - Successful status, 201; or
        - unsucessful status, non existing comment, 401
    """
    comment = db.session.get(Comment, id)
    if comment is None:
        resp = {
            'status': 'not successful',
            'message': 'Comment not found'
        }
        return make_response(jsonify(resp)), 401
    
    comment.content = str(request.form['content'])
    
    db.session.add(comment)
    db.session.commit()
    resp = {
        'status': "Successful",
        'message': 'Your comment has been edited'
    }
    return make_response(jsonify(resp)), 201

@bp.route('/likePost/<int:id>', methods = ['POST'])
def like_post(id):
    """
    Function for liking a post
    Inputs:
        - id: post_id of the post to be liked
    Functionalities:
        - The function queries the Post table of the database using the post_id
        - The total number of likes is increased by 1 count
    Output:
        - Successful status, 201; or
        - unsuccessful status, post not found, 401
    """
    post = db.session.get(Post, id)
    if post is None:
        resp = {
            'status': 'not successful',
            'message': 'Post not found'
        }
        return make_response(jsonify(resp)), 401
    
    post.likes = post.likes + 1
    
    db.session.add(post)
    db.session.commit()
    resp = {
        'status': "Successful",
        'message': 'Post has been liked'
    }
    return make_response(jsonify(resp)), 201

@bp.route('/unlikePost/<int:id>', methods = ['POST'])
def unlike_post(id):
    """
    Function for unliking a post
    Inputs:
        - id: post_id of the post to be unliked
    Functionalities:
        - The function queries the Post table of the database using the post_id
        - The total number of likes is decreased by 1 count
    Output:
        - Successful status, 201; or
        - unsuccessful status, post not found, 401
    """
    post = db.session.get(Post, id)
    if post is None:
        resp = {
            'status': 'not successful',
            'message': 'Post not found'
        }
        return make_response(jsonify(resp)), 401
    
    if post.likes == 0:
        resp = {
        'status': "Successful",
        'message': 'Post has been unliked'
        }
        return make_response(jsonify(resp)), 201

    post.likes = post.likes - 1
    
    db.session.add(post)
    db.session.commit()

    resp = {
        'status': "Successful",
        'message': 'Post has been unliked'
    }
    return make_response(jsonify(resp)), 201

@bp.route('/likesCount/<int:id>', methods = ['GET'])
def get_total_likes_on_post(id):
    """
    Function for getting the total likes on a post
    Inputs:
        - id: Post_id of the post
    Functionalities:
        - The function queries the Post table in the database using the post_id
    Output:
        - Return the total number of likes on the post, 200
        - Unsuccessful status, post not found, 401
    """
    post = db.session.get(Post, id)
    if post is None:
        resp = {'status': 'not successful',
            'message': 'Post not found'}
        return make_response(jsonify(resp)), 401
    total_likes = post.likes
    return make_response(jsonify(total_likes)), 200