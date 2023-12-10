from __future__ import annotations

from datetime import datetime

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, DateTime, Integer
from sqlalchemy.ext import declarative
from werkzeug.exceptions import BadRequest

db = SQLAlchemy(session_options={"autoflush": False})


def declarative_base(cls):
    return declarative.declarative_base(cls=cls)


@declarative_base
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

    def insert(self, session=None) -> Base:
        """
        Insert

        :return: Base
        """
        if not session:
            session = db.session
        session.add(self)
        session.commit()
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
    def update(cls, id: int, to_update, session=None) -> None:
        """
        Update row by id

        :param id:
        :param to_update:
        :return:
        """
        if not session:
            session = db.session
        session.query(cls).filter(cls.id == id).update(to_update)
        session.commit()

    @classmethod
    def get_by_id(cls, id: int, session=None):
        """
        Get object by id

        :param id:
        :return:
        """
        if not session:
            session = db.session
        row = session.query(cls).filter_by(id=id).first()
        return row

    @classmethod
    def get(cls, session=None):
        """

        :return:
        """
        if not session:
            session = db.session
        rows = session.query(cls).all()
        return rows
