from app.extensions import db

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
    def __repr__(self):
        return f'<User "{self.username}">'
    
    def obj_to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "username":self.username
        }
    

class Post(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200))
    content = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    mimetype = db.Column(db.Text, nullable=False)
    comments = db.relationship('Comment', backref = 'post', lazy = True)

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