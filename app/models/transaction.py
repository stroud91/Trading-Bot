from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from datetime import datetime

class Transaction(db.Model):
    __tablename__ = 'transactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    account_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('accounts.id')), nullable=False)
    market = db.Column(db.String(50), nullable=False)
    side = db.Column(db.String(10), nullable=False)
    size = db.Column(db.Float, nullable=False)
    leverage = db.Column(db.Float, nullable=False)
    liquidation_price = db.Column(db.Float, nullable=False)
    unrealized_pnl = db.Column(db.Float, nullable=False, default=0.0)
    realized_pnl = db.Column(db.Float, nullable=False, default=0.0)
    avg_open_price = db.Column(db.Float, nullable=False)
    avg_close_price = db.Column(db.Float, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationship
    account = relationship(
        'Account',
        back_populates='transactions'
    )

    def to_dict(self):
        return {
            'id': self.id,
            'account_id': self.account_id,
            'market': self.market,
            'side': self.side,
            'size': self.size,
            'leverage': self.leverage,
            'liquidation_price': self.liquidation_price,
            'unrealized_pnl': self.unrealized_pnl,
            'realized_pnl': self.realized_pnl,
            'avg_open_price': self.avg_open_price,
            'avg_close_price': self.avg_close_price,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
