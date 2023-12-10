from flask_restx.fields import Integer, List, Nested, String

from . import api

emotion_model = api.model(
    "Emotion",
    {
        "name": String(required=True, description="Emotion name"),
    },
)
