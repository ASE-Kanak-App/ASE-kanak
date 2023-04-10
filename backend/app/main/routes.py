from datetime import datetime
from app.main import bp
from app import db
from app.models import User, Post
from flask_login import current_user, login_required
from flask import render_template, flash, redirect, url_for, request, current_app, g
from flask import jsonify, make_response, request

# main page that the user views
@bp.route('/', methods=['GET', 'POST'])
@bp.route('/index', methods=['GET', 'POST'])
@login_required
def index():
    page = request.args.get('page', 1, type=int)
    posts = current_user.followed_posts()\
        .paginate(page, current_app.config['POSTS_PER_PAGE'], False)
    next_url = url_for('main.index', page=posts.next_num)\
        if posts.has_next else None
    prev_url = url_for('main.index', page=posts.prev_num)\
        if posts.has_prev else None
    return render_template('index.html',
                           title='Home',
                           posts=posts.items,
                           next_url=next_url,
                           prev_url=prev_url)

# the explore page
@bp.route('/explore')
@login_required
def explore():
    page = request.args.get('page', 1, type=int)
    posts = Post.query.order_by(Post.timestamp.desc())\
        .paginate(page, current_app.config['POSTS_PER_PAGE'], False)
    next_url = url_for('main.explore', page=posts.next_num)\
        if posts.has_next else None
    prev_url = url_for('main.explore', page=posts.prev_num)\
        if posts.has_prev else None
    return render_template('index.html',
                           title='Explore',
                           posts=posts.items,
                           next_url=next_url,
                           prev_url=prev_url)

# viewing another users profile
@bp.route('/user/<username>')
@login_required
def user(username):
    user = User.query.filter_by(username=username).first_or_404()
    page = request.args.get('page', 1, type=int)
    posts = user.posts.order_by(Post.timestamp.desc())\
        .paginate(page, current_app.config['POSTS_PER_PAGE'], False)
    next_url = url_for('main.user', username=user.username, page=posts.next_num) \
        if posts.has_next else None
    prev_url = url_for('main.user', username=user.username, page=posts.prev_num)\
        if posts.has_prev else None
    return render_template('user.html',
                           user=user,
                           posts=posts.items,
                           next_url=next_url,
                           prev_url=prev_url)

# current user profile
@bp.route('/profile')
def profile():
    return '<h4>This is the profile</h4>'

@bp.route('/follow/<username>')
@login_required
def follow(username):
    user = User.query.filter_by(username=username).first()
    if user is None:
        resp = {'status': 'Unsuccessful',
                'message': 'User not found'}
        return make_response(jsonify(resp)), 401
        # return redirect(url_for('main.index'))
    if user == current_user:
        resp = {'status': 'Unsuccessful',
                'message': 'You cannot follow yourself'}
        return make_response(jsonify(resp)), 401
        # return redirect(url_for('main.user', username=username))
    current_user.follow(user)
    db.session.commit()
    resp = {'status': 'Successful',
            'message': f'You are now following {username}!'}
    return make_response(jsonify(resp)), 201
    # return redirect(url_for('main.user', username=username))

@bp.route('/unfollow/<username>')
@login_required
def unfollow(username):
    user = User.query.filter_by(username=username).first()
    if user is None:
        resp = {'status': 'Unsuccessful',
                'message': 'User not found'}
        return make_response(jsonify(resp)), 401
        # return redirect(url_for('main.index'))
    if user == current_user:
        resp = {'status': 'Unsuccessful',
                'message': 'You cannot unfollow yourself'}
        return make_response(jsonify(resp)), 401
        # return redirect(url_for('main.user', username=username))
    current_user.unfollow(user)
    db.session.commit()
    resp = {'status': 'Successful',
            'message': f'You are not following {username}!'}
    return make_response(jsonify(resp)), 201
    # return redirect(url_for('main.user', username=username))

# searching for other users
@bp.route('/search')
@login_required
def search():
    return '<h4>This is the search result</h4>'