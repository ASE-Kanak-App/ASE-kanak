from app.posts import bp
from app.extensions import db
from app.models.post import Post
from flask import jsonify

@bp.route('/')
def index():
    posts = Post.query.all()
    
    all_posts = list()
    for post in posts:
        all_posts.append(post.obj_to_dict())

    return jsonify(all_posts)

@bp.route('/categories/')
def categories():
    return '<h4>This is the categories for the posts</h4>'