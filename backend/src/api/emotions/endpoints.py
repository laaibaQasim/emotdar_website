from http import HTTPStatus

from flask_restx import Resource

from api.emotions import schemas

# from common.lists import emotions
from common.enums import Emotions
from helper.response import success

from . import api


@api.route("")
class EmotionList(Resource):
    @api.marshal_list_with(schemas.emotion_response, skip_none=True)
    def get(self):
        """List all emotions"""
        # return failure("Emotion List not found"), HTTPStatus.NOT_FOUND
        return (
            success(
                [{"name": emotion} for emotion in Emotions.list()], len(Emotions.list())
            ),
            HTTPStatus.OK,
        )
