from http import HTTPStatus

from flask import g
from flask_restx import Resource
from flask import send_from_directory

from api.emotions import schemas

from helper.response import success
from model.sentence import Sentence
from static import emojis

from . import api


@api.route("")
class EmotionList(Resource):
    def get(self):
        """List all sentences"""
        sentences = Sentence.get()
        return (
            success(
                [
                    {"id": sentence.id, "text": sentence.sentence_text}
                    for sentence in sentences
                ],
                len(sentences),
            ),
            HTTPStatus.OK,
        )
