from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from model.base import Base, db


class Sentence(Base):
    __tablename__ = "sentence"
    __table_args__ = {"extend_existing": True}

    sentence_text = Column(String(255), nullable=False)
