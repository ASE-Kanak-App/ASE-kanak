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
    posts = Post.query.all()
    
    all_posts = list()
    for post in posts:
        all_posts.append(post.obj_to_dict())

    return make_response(jsonify(all_posts)), 200

@bp.route('/retrievePost/<int:id>')
def retrieve_post(id):
    post = Post.query.filter_by(id=id).first_or_404()

    return jsonify(post.obj_to_dict())

@bp.route('/retrieveUserPosts/<int:id>', methods = ['GET'])
def retrieve_user_posts(id):
    posts = Post.query.filter_by(user_id=id).all()
    all_posts = list()
    for post in posts:
        all_posts.append(post.obj_to_dict())
    return make_response(jsonify(all_posts)), 201

@bp.route('/createPost/', methods = ['POST'])
def create_post():
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
            filename = secure_filename(file.filename)

            post = Post(title = request.form['title'], content = request.form['content'],
                user_id = request.form['user_id'], mimetype = filename)
            
            file.save(os.path.join(os.environ.get('UPLOAD_FOLDER'), filename))
            db.session.add(post)
            db.session.commit()

            return make_response(jsonify(post.obj_to_dict())), 201

@bp.route('/updatePost/<int:id>', methods = ['POST'])
def update_post(id):
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
    comment = Comment(post_id = request.form['post_id'], content = request.form['content'],
                user_id = request.form['user_id'])
    db.session.add(comment)
    db.session.commit()

    return make_response(jsonify(comment.obj_to_dict())), 201

@bp.route('/getCommentByPost/<int:id>', methods = ['GET'])
def get_comments_by_post(id):
    comments = Comment.query.filter_by(post_id=id).all()
    
    all_comments = list()
    for comment in comments:
        all_comments.append(comment.obj_to_dict())

    return make_response(jsonify(all_comments)), 200

@bp.route('/getCommentByUser/<int:id>', methods = ['GET'])
def get_comments_by_user(id):
    comments = Comment.query.filter_by(user_id=id).all()
    
    all_comments = list()
    for comment in comments:
        all_comments.append(comment.obj_to_dict())

    return make_response(jsonify(all_comments)), 200

@bp.route('/deleteComment/<int:id>', methods = ['DELETE'])
def delete_comment(id):
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
    post = db.session.get(Post, id)
    if post is None:
        resp = {'status': 'not successful',
            'message': 'Post not found'}
        return make_response(jsonify(resp)), 401
    total_likes = post.likes
    return make_response(jsonify(total_likes)), 200