from .db import db, environment, SCHEMA, add_prefix_for_prod

from sqlalchemy.orm import relationship
from datetime import datetime

class MarketData(db.Model):
    __tablename__ = 'market_data'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    asset_type = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Float, nullable=False)
    high = db.Column(db.Float, nullable=False)
    low = db.Column(db.Float, nullable=False)
    open = db.Column(db.Float, nullable=False)
    close = db.Column(db.Float, nullable=False)
    volume = db.Column(db.Float, nullable=False)
    date_time = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)


    news = relationship(
        'News',
        back_populates='market_data',
        primaryjoin="MarketData.id==foreign(News.market_data_id)"
    )


    def to_dict(self):
        return {
            'id': self.data_id,
            'asset_type': self.asset_type,
            'price': self.price,
            'high': self.high,
            'low': self.low,
            'open': self.open,
            'close': self.close,
            'volume': self.volume,
            'date_time': self.date_time.isoformat(),
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
