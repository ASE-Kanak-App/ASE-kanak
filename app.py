from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #Comment this on deployment
from backend.MainApiHandler import MainApiHandler

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app)
api = Api(app)

@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')
    

api.add_resource(MainApiHandler, '/flask/main')
