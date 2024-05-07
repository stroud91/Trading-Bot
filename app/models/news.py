from .db import db, environment, SCHEMA, add_prefix_for_prod

from datetime import datetime
from sqlalchemy.orm import relationship


class News(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    publication_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    description = db.Column(db.Text, nullable=True)
    url = db.Column(db.String(255), nullable=False)
    market_data_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('market_data.data_id')), nullable=False)

    market_data = relationship('MarketData', back_populates='news')


    def to_dict(self):
       
        return {
            'id': self.id,
            'title': self.title,
            'publication_date': self.publication_date.isoformat(),
            'description': self.description,
            'url': self.url,
            'market_data_id': self.market_data_id
        }
