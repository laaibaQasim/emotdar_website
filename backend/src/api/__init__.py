from flask import Blueprint
from flask_restx import Api

from .emotions.endpoints import api as emotion_api
from .sentences.endpoints import api as sentence_api
from .recording.endpoints import api as recording_api

blueprint = Blueprint("api", __name__)

authorizations = {
    "Authorization": {
        "description": "",
        "type": "apiKey",
        "in": "header",
        "name": "Authorization",
    }
}

api = Api(
    blueprint,
    title="Emodar API",
    version="0.1",
    description="Emodar APIs",
    authorizations=authorizations,
    security="Authorization",
)

api.add_namespace(emotion_api)
api.add_namespace(sentence_api)
api.add_namespace(recording_api)
