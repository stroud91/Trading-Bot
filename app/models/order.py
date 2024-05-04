from .db import db
from .account import Account
from .db import add_prefix_for_prod
from sqlalchemy.orm import relationship
from datetime import datetime

class Order(db.Model):
    __tablename__ = 'orders'
    order_id = db.Column(db.Integer, primary_key=True)
    account_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('accounts.account_id')), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Float, nullable=False)
    order_date = db.Column(db.DateTime, default=datetime.utcnow)


    account = relationship('Account', back_populates='orders')



    def to_dict(self):
        return {
            'order_id': self.order_id,
            'account_id': self.account_id,
            'type': self.type,
            'status': self.status,
            'price': self.price,
            'quantity': self.quantity,
            'order_date': self.order_date.isoformat()
        }
