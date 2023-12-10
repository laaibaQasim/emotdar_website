from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from model.base import Base, db


class Contributor(Base):
    __tablename__ = "contributor"

    password = Column(String, nullable=False)
    roll_number = Column(String(10), unique=True, nullable=False)

    @classmethod
    def get_by_roll_number(cls, roll_number):
        """
        Get by roll_number

        Args:
            roll_number: roll_number to get contributor

        Returns:
            contributor
        """
        row = db.session.query(cls).filter(cls.roll_number == roll_number).first()
        return row
