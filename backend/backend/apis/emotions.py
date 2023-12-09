import os
from flask import send_from_directory
from flask_restx import Resource
from flask_restx import fields
from . import app, api
from .utils import emotions, recording_directory, emoji_directory, default_emoji_filename

# Define a data structure for emotions
emotion_model = api.model(
    "Emotion",
    {
        "name": fields.String(required=True, description="Emotion name"),
    },
)

@api.route("/emotions")
class EmotionList(Resource):
    @api.marshal_list_with(emotion_model)
    def get(self):
        """List all emotions"""
        return [{"name": emotion} for emotion in emotions]


@api.route("/emotions/<string:name>/play")
class EmotionPlay(Resource):
    def get(self, name):
        """Play a video for the selected emotion"""
        # Assuming your video files are stored in the 'recordings' directory
        video_file_path = os.path.join(recording_directory, f"{name}.mp4")

        if os.path.isfile(video_file_path):
            return send_from_directory(
                recording_directory, f"{name}.mp4", as_attachment=True
            )

@api.route("/emoji/play")
class Emoji(Resource):
    def get(self):
        emoji_path = os.path.join(emoji_directory, default_emoji_filename)

        if not os.path.exists(emoji_path):
            return {"error": f"Emoji file {emoji_path} not found"}, 404

        return send_from_directory(
        emoji_directory, default_emoji_filename, as_attachment=True
    )

