from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from datetime import datetime

class Account(db.Model):
    __tablename__ = 'accounts'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    balance = db.Column(db.Float, nullable=False)
    account_type = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

    # Relationships
    user = relationship('User', back_populates='accounts')
    transactions = relationship('Transaction', back_populates='account', primaryjoin="Account.id == foreign(Transaction.account_id)")
    orders = relationship(
        'Order',
        back_populates='account',
        cascade='all, delete-orphan',
        primaryjoin="Account.id==foreign(Order.account_id)"
    )
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'balance': self.balance,
            'account_type': self.account_type,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'transactions': [transaction.to_dict() for transaction in self.transactions],
            'orders': [order.to_dict() for order in self.orders]
        }
