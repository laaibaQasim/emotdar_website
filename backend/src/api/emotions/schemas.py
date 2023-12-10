from flask_restx.fields import Integer, List, Nested, String

from . import api

emotion_post = api.model(
    "emotion_post",
    {
        "name": String(required=True, description="Emotion name"),
    },
    strict=True,
)

emotion_model = api.model(
    "emotion_model",
    {
        "id": Integer(),
        "name": String(required=True, description="Emotion name"),
    },
    strict=True,
)

emotion_response = api.model(
    "emotion_response",
    {
        "status": String(description="ok|nok"),
        "object": Nested(emotion_model, skip_none=True, allow_null=True),
        "total_rows": Integer(),
        "errors": List(String),
    },
    strict=True,
)
