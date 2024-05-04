from .db import db
from datetime import datetime

class MarketData(db.Model):
    __tablename__ = 'market_data'
    data_id = db.Column(db.Integer, primary_key=True)
    asset_type = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Float, nullable=False)
    high = db.Column(db.Float, nullable=False)
    low = db.Column(db.Float, nullable=False)
    open = db.Column(db.Float, nullable=False)
    close = db.Column(db.Float, nullable=False)
    volume = db.Column(db.Float, nullable=False)
    date_time = db.Column(db.DateTime, nullable=False)



    def to_dict(self):
        return {
            'data_id': self.data_id,
            'asset_type': self.asset_type,
            'price': self.price,
            'high': self.high,
            'low': self.low,
            'open': self.open,
            'close': self.close,
            'volume': self.volume,
            'date_time': self.date_time.isoformat()
        }
