from app.extensions import db
from flask_login import UserMixin
from datetime import datetime


class Follow(db.Model):
    follower_id = db.Column(db.Integer, db.ForeignKey('user.id'),
                            primary_key=True)
    followed_id = db.Column(db.Integer, db.ForeignKey('user.id'),
                            primary_key=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

class User(db.Model, UserMixin):

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    username = db.Column(db.String(1000))
    firstname = db.Column(db.String(1000))
    lastname = db.Column(db.String(1000))
    intro = db.Column(db.String(10000))
    phone = db.Column(db.String(12))
    posts = db.relationship('Post', backref = 'user', lazy = True)
    comments = db.relationship('Comment', backref='author', lazy='dynamic')
    likes = db.relationship('Likes', backref='author', lazy='dynamic')
    followed = db.relationship('Follow',
                               foreign_keys=[Follow.follower_id],
                               backref=db.backref('follower', lazy='joined'),
                               lazy='dynamic',
                               cascade='all, delete-orphan')
    followers = db.relationship('Follow',
                              foreign_keys=[Follow.followed_id],
                              backref=db.backref('followed', lazy='joined'),
                              lazy='dynamic',
                              cascade='all, delete-orphan')
    
    def is_following(self, user):
        return self.followed.filter(Follow.followed_id == user.id).count() > 0
    
    def follow(self, user):
        if not self.is_following(user):
            self.followed.append(user)

    def unfollow(self, user):
        if self.is_following(user):
            self.followed.remove(user)

    def followed_posts(self):
        followed = Post.query.join(Follow, (Follow.followed_id == Post.user_id)) \
            .filter(Follow.follower_id == self.id)
        own = Post.query.filter_by(user_id=self.id)
        return followed.union(own).order_by(Post.timestamp.desc())
    
    def __repr__(self):
        return f'<User "{self.username}">'
    
    def obj_to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "username":self.username,
            "posts":self.posts
        }
    
class TokenBlockList(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), nullable=True, index=True)
    created_at = db.Column(db.DateTime, nullable=True)

    def __repr__(self):
        return f'<TokenBlockList "{self.jti}">'
    
    def obj_to_dict(self):
        return {
            "id":self.id,
            "jti": self.jti,
            "created_at":self.created_at,
        }

class Post(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200))
    content = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    mimetype = db.Column(db.Text, nullable=False)
    comments = db.relationship('Comment', backref='post', lazy='dynamic')
    likes = db.relationship('Likes', backref='post', lazy='dynamic')

    def __repr__(self):
        return f'<Post "{self.title}">'
    
    def obj_to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "content":self.content,
            "image":self.mimetype,
        }

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(255))
    commneted_on = db.Column(db.Integer, db.ForeignKey('post.id'))
    commented_by = db.Column(db.Integer, db.ForeignKey('user.id'))
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)

class Likes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    liked_on = db.Column(db.Integer, db.ForeignKey('post.id'))
    liked_by = db.Column(db.Integer, db.ForeignKey('user.id'))