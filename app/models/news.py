from .db import db, environment, SCHEMA, add_prefix_for_prod

from datetime import datetime
from sqlalchemy.orm import relationship


class News(db.Model):

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    publication_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    description = db.Column(db.Text, nullable=True)
    url = db.Column(db.String(255), nullable=False)

    def to_dict(self):

        return {
            'id': self.id,
            'title': self.title,
            'publication_date': self.publication_date,
            'description': self.description,
            'url': self.url,

        }
