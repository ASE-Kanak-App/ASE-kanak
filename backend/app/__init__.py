from flask import Flask

from config import Config
from app.extensions import db

def create_app(config_class = Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    #Initialize flask extensions here
    db.init_app(app=app)

    #Register blueprints here
    from app.main import bp as main_bp
    app.register_blueprint(main_bp)

    from app.posts import bp as posts_bp
    app.register_blueprint(posts_bp, url_prefix='/posts')

    @app.route('/test/')
    def test_page():
        return '<h1>Testing the flask application factory pattern</h1>'
    
    return app