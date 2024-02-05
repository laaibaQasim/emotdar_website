from __future__ import annotations

from datetime import datetime

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, DateTime, Integer
from sqlalchemy.ext.declarative import as_declarative, declared_attr

db = SQLAlchemy(session_options={"autoflush": False})


@as_declarative()
class Base(object):
    __abstract__ = True

    id = Column(Integer, primary_key=True, autoincrement=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=True)
    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=True,
    )

    @declared_attr
    def __tablename__(cls) -> str:
        """
        Generate __tablename__ automatically

        Returns:
            Table name
        """
        return cls.__name__.lower()

    def insert(self) -> Base:
        """
        Insert

        :return: Base
        """
        db.session.add(self)
        db.session.commit()
        return self

    def delete(self) -> Base:
        """
        Delete

        :return: Base
        """
        db.session.delete(self)
        db.session.commit()
        return self

    @classmethod
    def update(cls, id: int, to_update: dict) -> None:
        """
        Update row by id

        :param id:
        :param to_update:
        :return:
        """
        db.session.query(cls).filter(cls.id == id).update(to_update)
        db.session.commit()

    @classmethod
    def get_by_id(cls, id: int):
        """
        Get object by id

        :param id:
        :return:
        """
        return db.session.query(cls).filter_by(id=id).first()

    @classmethod
    def get(cls):
        """

        :return:
        """
        return db.session.query(cls).all()
