# db/crud_operations/sentences_crud.py
from .. import db_connection

class SentencesCrud:
    def __init__(self):
        self.db_connection = db_connection

    def create_record(self, data):
        # Implement your create operation for Sentences table here
        pass

    def read_record(self, record_id):
        # Implement your read operation for Sentences table here
        pass

    def update_record(self, record_id, data):
        # Implement your update operation for Sentences table here
        pass

    def delete_record(self, record_id):
        # Implement your delete operation for Sentences table here
        pass
