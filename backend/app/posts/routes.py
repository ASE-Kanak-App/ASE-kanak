from app.posts import bp
from app.extensions import db
from app.models.models import Post
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
        
        file_name = request.files['file']

        # If the user does not select a file, the browser submits an
        # empty file without a filename.

        if file_name.filename == '':
            resp = {
                    'status': 'not successful',
                    'message': 'File cannot be null'
            }
            return make_response(jsonify(resp)), 401
        
        if file_name and allowed_file(file_name.filename):
            filename = secure_filename(file_name.filename)

            post = Post(title = request.form['title'], content = request.form['content'],
                user_id = request.form['user_id'], mimetype = filename)
            
            file_name.save(os.path.join(os.environ.get('UPLOAD_FOLDER'), filename))
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

    file_name = request.files['file']
    if file_name:
        if file_name.filename == '':
            resp = {
                    'status': 'not successful',
                    'message': 'File cannot be null'
            }
            return make_response(jsonify(resp)), 401
        
        if file_name and allowed_file(file_name.filename):
            filename = secure_filename(file_name.filename)
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