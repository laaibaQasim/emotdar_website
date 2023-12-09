# db/crud_manager.py
from .crud_operations.contributors_crud import ContributorsCrud
from .crud_operations.emotions_crud import EmotionsCrud
from .crud_operations.sentences_crud import SentencesCrud
from .crud_operations.recordings_crud import RecordingsCrud

class CrudManager:
    def __init__(self):
        self.contributors_crud = ContributorsCrud()
        self.emotions_crud = EmotionsCrud()
        self.sentences_crud = SentencesCrud()
        self.recordings_crud = RecordingsCrud()
