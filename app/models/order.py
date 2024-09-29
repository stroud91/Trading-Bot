from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from datetime import datetime

class Order(db.Model):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    account_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('accounts.id')), nullable=False)
    market = db.Column(db.String(50), nullable=False)
    side = db.Column(db.String(10), nullable=False)
    status = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Float, nullable=False)
    amount = db.Column(db.Float, nullable=False)
    filled = db.Column(db.Float, nullable=False, default=0.0)
    trigger = db.Column(db.String(50))
    good_til = db.Column(db.DateTime)
    execution_price = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

    # Relationship
    account = relationship(
        'Account',
        back_populates='orders'
    )

    def to_dict(self):
        return {
            'id': self.id,
            'account_id': self.account_id,
            'market': self.market,
            'side': self.side,
            'status': self.status,
            'price': self.price,
            'amount': self.amount,
            'filled': self.filled,
            'trigger': self.trigger,
            'good_til': self.good_til,
            'execution_price': self.execution_price,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
