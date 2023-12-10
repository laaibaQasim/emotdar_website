from flask_restx import Resource

from api.emotions import schemas
from api.utils import emotions

from . import api


@api.route("")
class EmotionList(Resource):
    @api.marshal_list_with(schemas.emotion_model)
    def get(self):
        """List all emotions"""
        return [{"name": emotion} for emotion in emotions]
