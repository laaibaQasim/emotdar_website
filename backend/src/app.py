from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate

from config import settings
from model.base import db

from .api.db.crud_manager import CrudManager

app = Flask(__name__, static_folder="/static")
app.app_context().push()

app.config["SQLALCHEMY_DATABASE_URI"] = settings.SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["CORS_HEADERS"] = "Content-Type"
db.init_app(app)
Migrate(app, db)
CORS(app, max_age=600)

if __name__ == "__main__":
    crudManager = CrudManager()
    app.run(debug=True, port=5000)
