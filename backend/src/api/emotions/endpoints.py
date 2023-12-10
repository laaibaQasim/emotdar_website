from http import HTTPStatus

from flask import g
from flask_restx import Resource

from api.emotions import schemas
# from common.lists import emotions
from common.enums import Emotions
from decorator.authorization import auth
from helper.response import failure, success
from model import Emotion

from . import api


@api.route("")
class EmotionList(Resource):
    @api.marshal_list_with(schemas.emotion_response, skip_none=True)
    @api.expect(schemas.emotion_post, validate=True)
    @auth
    def post(self):
        """
        Add an emotion

        Returns:
            Emotion
        """
        emotion = Emotion.get_by_name(api.payload["name"])
        if emotion:
            err = "Emotion already exists"
            return failure(err), HTTPStatus.BAD_REQUEST
        emotion = Emotion(**api.payload).insert()
        return success(emotion), HTTPStatus.CREATED

    @api.marshal_list_with(schemas.emotion_response, skip_none=True)
    @auth
    def get(self):
        """List all emotions"""
        emotions = Emotion.get()
        return success(emotions), HTTPStatus.OK
        # print(g.contributor.id)
        # return failure("Emotion List not found"), HTTPStatus.NOT_FOUND
        # return (
        #     success(
        #         [{"name": emotion} for emotion in Emotions.list()], len(Emotions.list())
        #     ),
        #     HTTPStatus.OK,
        # )


@api.route("/<int:emotion_id>")
class EmotionItem(Resource):
    @api.marshal_list_with(schemas.emotion_response, skip_none=True)
    @api.expect(schemas.emotion_post, validate=True)
    def patch(self, emotion_id):
        """
        Update an emotion

        Returns:
            Emotion
        """
        emotion = Emotion.get_by_id(emotion_id)
        if not emotion:
            return failure("Emotion does not exist"), HTTPStatus.NOT_FOUND
        Emotion.update(emotion.id, api.payload)
        return success(emotion), HTTPStatus.OK

    @api.marshal_list_with(schemas.emotion_response, skip_none=True)
    def get(self, emotion_id):
        """
        Get emotion by id

        Args:
            emotion_id (int): id of emotion

        Returns:
            Emotion
        """
        emotion = Emotion.get_by_id(emotion_id)
        if not emotion:
            return failure("Emotion does not exist"), HTTPStatus.NOT_FOUND
        return success(emotion), HTTPStatus.OK

    @api.marshal_list_with(schemas.emotion_response, skip_none=True)
    def delete(self, emotion_id):
        """
        Delete an emotion

        Returns:
            "", 204
        """
        emotion = Emotion.get_by_id(emotion_id)
        if not emotion:
            return failure("Emotion does not exist"), HTTPStatus.NOT_FOUND
        emotion.delete()
        return "", HTTPStatus.NO_CONTENT
