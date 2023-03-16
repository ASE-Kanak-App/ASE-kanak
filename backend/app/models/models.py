from app.extensions import db

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

    def __repr__(self):
        return f'<User "{self.username}">'
    
    def obj_to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "username":self.username,
            "posts":self.posts
        }
    


class Post(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200))
    content = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
        return f'<Post "{self.title}">'
    
    def obj_to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "content":self.content
        }