from .db import db
from .user import User
from .db import add_prefix_for_prod
from sqlalchemy.orm import relationship

class Account(db.Model):
    __tablename__ = 'accounts'
    account_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    balance = db.Column(db.Float, nullable=False)
    account_type = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

     # Relationships
    user = relationship('User', back_populates='accounts')
    transactions = relationship('Transaction', back_populates='account', cascade='all, delete-orphan')
    orders = relationship('Order', back_populates='account', cascade='all, delete-orphan')


    def to_dict(self):
        return {
            'account_id': self.account_id,
            'user_id': self.user_id,
            'balance': self.balance,
            'account_type': self.account_type,
            'transactions': [transaction.to_dict() for transaction in self.transactions],
            'orders': [order.to_dict() for order in self.orders]
        }
