from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from model.base import Base, db


class EmotionSentence(Base):
    __tablename__ = "emotion_sentence"
    __table_args__ = {"extend_existing": True}

    sentence_id = Column(Integer, ForeignKey("sentence.id"))
    emotion_id = Column(Integer, ForeignKey("emotion.id"))

    @classmethod
    def get_by_emotion_sentence(cls, sentence_id, emotion_id):
        try:
            return (
                db.session.query(cls)
                .filter(cls.sentence_id == sentence_id, cls.emotion_id == emotion_id)
                .first()
            )
        except Exception as e:
            print(f"Error getting EmotionSentence: {e}")
