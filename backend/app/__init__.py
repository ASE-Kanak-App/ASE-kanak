from flask import Flask
from flask_cors import CORS
from config import Config
from app.extensions import db
from flask_jwt_extended import JWTManager

def create_app(config_class = Config):
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(config_class)

    #Initialize flask extensions here
    db.init_app(app=app)
    jwt_app = JWTManager(app)

    #Register blueprints here
    from app.main import bp as main_bp
    app.register_blueprint(main_bp)

    from app.posts import bp as posts_bp
    app.register_blueprint(posts_bp, url_prefix='/posts')

    from app.auth import bp as auth_bp
    app.register_blueprint(auth_bp, url_prefix='/auth')

    @app.route('/test/')
    def test_page():
        return '<h1>Testing the flask application factory pattern</h1>'
    
    return app