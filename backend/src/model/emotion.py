from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from model.base import Base, db


class Emotion(Base):
    __tablename__ = "emotion"
    __table_args__ = {"extend_existing": True}

    name = Column(String(255), nullable=False)
