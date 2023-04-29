from app.extensions import db
from datetime import datetime

class Follow(db.Model):
    __tablename__ = 'follows'
    follower_id = db.Column(db.Integer, db.ForeignKey('user.id'),
                            primary_key=True)
    followed_id = db.Column(db.Integer, db.ForeignKey('user.id'),
                            primary_key=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def obj_to_dict(self):
        return {
            "follower_id": self.follower_id,
            "followed_id": self.followed_id,
            "timestamp":self.timestamp
        }



class User(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    username = db.Column(db.String(1000))
    firstname = db.Column(db.String(1000))
    lastname = db.Column(db.String(1000))
    intro = db.Column(db.String(10000))
    phone = db.Column(db.String(12))
    posts = db.relationship('Post', backref = 'user', lazy = True)
    comments = db.relationship('Comment', backref = 'user', lazy = True)
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


    def __repr__(self):
        return f'<User "{self.username}">'
    
    def obj_to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "username":self.username
        }
    
    def is_following(self, user):
        if user.id is None:
            return False
        return self.followed.filter_by(
            followed_id=user.id).first() is not None

    def is_followed_by(self, user):
        if user.id is None:
            return False
        return self.followers.filter_by(
            follower_id=user.id).first() is not None
    
    def follow(self, user):
        if not self.is_following(user):
            f = Follow(follower=self, followed=user)
            db.session.add(f)
            return True

    def unfollow(self, user):
        f = self.followed.filter_by(followed_id=user.id).first()
        if f:
            db.session.delete(f)
            return True
    

class Post(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200))
    content = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    mimetype = db.Column(db.Text, nullable=False)
    likes = db.Column(db.Integer, default=0)
    comments = db.relationship('Comment', backref = 'post', lazy = True)
    
    def __repr__(self):
        return f'<Post "{self.title}">'
    
    def obj_to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "content":self.content,
            "likes":self.likes,
            "image":self.mimetype,
            "user_id": self.user_id,
        }  

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
        return f'<Comment "{self.content[:20]}...">'
    
    def obj_to_dict(self):
        return {
            "content":self.content,
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



