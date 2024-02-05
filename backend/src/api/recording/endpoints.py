from http import HTTPStatus

from flask import g, request
from flask_restx import Resource
from flask import send_from_directory

import os

from api.emotions import schemas

from api.utils import save_contributor, save_data


from . import api


@api.route("")
class SaveVideo(Resource):
    def post(self):
        """Save recorded audio/video based on selected emotion"""
        data = request.form  # Access form data
        folder_name = None
        extension = None
        data_to_save = None
        audio, video = False, False

        if "name" not in data:
            return {"error": "Emotion name not provided"}, 400

        if "id" not in data:
            return {"error": "Sentence ID not provided"}, 400

        if "rollNo" not in data:
            return {"error": "Roll No not provided"}, 400

        if "video" in data:
            folder_name = "recorded_videos"
            extension = "mp4"
            data_to_save = request.files["video"]
            video = True
        else:
            folder_name = "recorded_audios"
            extension = "webm"
            data_to_save = request.files["audio"]
            audio = True

        emotion_name = data["name"].upper()
        sentence_id = data["id"]
        roll_no = data["rollNo"].upper()
        filename_webm = f"{roll_no}_{emotion_name[:3]}_{sentence_id}.{extension}"
        file_path_webm = os.path.join(
            f"backend\\src\\static\\{folder_name}", filename_webm
        )
        print(file_path_webm)

        try:
            data_to_save.save(file_path_webm)
        except Exception as e:
            return {"message": f"Error saving file: {e}"}
        finally:
            save_data(roll_no, emotion_name, sentence_id, audio, video)

        return {"message": "Data saved successfully", "filename": filename_webm}


@api.route("/<string:name>/<string:id_>")
class EmotionPlay(Resource):
    def get(self, name, id_):
        """Play a video for the selected emotion"""
        filename = f"{name}_1.mp4"
        return send_from_directory("static/videos", filename, as_attachment=True)
