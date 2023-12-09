from .apis import app, api
from .apis.db.crud_manager import CrudManager
from .apis.emotions import EmotionList, EmotionPlay, Emoji

if __name__ == "__main__":
    crudManager = CrudManager()
    app.run(debug=True, port=5000)