from .db import db
from .account import Account
from .db import add_prefix_for_prod
from sqlalchemy.orm import relationship
from datetime import datetime

class Transaction(db.Model):
    __tablename__ = 'transactions'
    transaction_id = db.Column(db.Integer, primary_key=True)
    account_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('accounts.account_id')), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    transaction_date = db.Column(db.DateTime, default=datetime.utcnow)

     # Relationships
    account = relationship('Account', back_populates='transactions')



    def to_dict(self):
        return {
            'transaction_id': self.transaction_id,
            'account_id': self.account_id,
            'type': self.type,
            'amount': self.amount,
            'transaction_date': self.transaction_date.isoformat()
        }
