from flask_restx import Api
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

api = Api(
    app,
    version="1.0",
    title="Emotion Recorder API",
    description="API for emotion recording",
)
