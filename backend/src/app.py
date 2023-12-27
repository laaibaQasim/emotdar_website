from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate

from api import blueprint
from config import settings
from model.base import db

app = Flask(__name__, static_folder="/static")
app.app_context().push()

app.config["SQLALCHEMY_DATABASE_URI"] = settings.database_uri
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["CORS_HEADERS"] = "Content-Type"
app.register_blueprint(blueprint, url_prefix="/")
db.init_app(app)
Migrate(app, db)
CORS(app, max_age=600)

if __name__ == "__main__":
    app.run(debug=True, port=5000)


# insert all emotions
# insert all sentences
# insert emotion_sentence
# emotion_id, sentence_id, contributor_id
# if emotion_id
# if sentence_id
# emotion_sentence = emotion_sentence(emotion_id, sentence_id)
