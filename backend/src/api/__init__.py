import logging
from http import HTTPStatus

from flask import Blueprint
from flask_restx import Api
from werkzeug.exceptions import Unauthorized

from .emotions.endpoints import api as emotion_api

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
