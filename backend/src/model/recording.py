from sqlalchemy import Column, ForeignKey, Integer, String, Boolean
from sqlalchemy.orm import relationship

from model.base import Base, db


class Recording(Base):
    __tablename__ = "recording"
    __table_args__ = {"extend_existing": True}

    contributor_id = Column(Integer, ForeignKey("contributor.id"))
    emotion_sentence_id = Column(Integer, ForeignKey("emotion_sentence.id"))
    audio_recorded = Column(Boolean, default=False)
    video_recorded = Column(Boolean, default=False)
