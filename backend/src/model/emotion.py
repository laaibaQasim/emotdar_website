from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from model.base import Base, db


class Emotion(Base):
    __tablename__ = "emotion"
    __table_args__ = {"extend_existing": True}

    name = Column(String(255), nullable=False)

    @classmethod
    def get_by_name(cls, emotion: str) -> "Emotion":
        """
        Get by name

        Args:
            name: name to get an emotion

        Returns:
            emotion
        """
        return db.session.query(cls).filter(cls.name == emotion).first()
