from app.extensions import db

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200))
    content = db.Column(db.Text)

    def __repr__(self):
        return f'<Post "{self.title}">'
    
    def obj_to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "content":self.content
        }