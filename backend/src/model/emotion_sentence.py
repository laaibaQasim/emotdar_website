from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from model.base import Base, db


class EmotionSentence(Base):
    __tablename__ = "emotion_sentence"
    __table_args__ = {"extend_existing": True}

    sentence_id = Column(Integer, ForeignKey("sentence.id"))
    emotion_id = Column(Integer, ForeignKey("emotion.id"))
