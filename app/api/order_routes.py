from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.models import db, Order, Transaction, Account
from datetime import datetime
from dateutil import parser  # To parse date strings into datetime objects

order_bp = Blueprint('order_bp', __name__)

@order_bp.route('/orders', methods=['GET'])
@login_required
def get_all_orders():
    orders = Order.query.join(Account).filter(Account.user_id == current_user.id).all()
    return jsonify([order.to_dict() for order in orders]), 200

@order_bp.route('/orders/<int:order_id>', methods=['GET'])
@login_required
def get_order_detail(order_id):
    order = Order.query.join(Account).filter(Order.id == order_id, Account.user_id == current_user.id).first()
    if order:
        return jsonify(order.to_dict()), 200
    else:
        return jsonify({"error": "Order not found or unauthorized"}), 404

@order_bp.route('/orders', methods=['POST'])
@login_required
def create_order():
    data = request.get_json()
    account = Account.query.get(data.get('account_id'))
    if account and account.user_id == current_user.id:
        try:
            # Parse 'good_til' if it's provided
            good_til = data.get('good_til')
            if good_til:
                good_til = parser.parse(good_til)
            else:
                good_til = None

            new_order = Order(
                account_id=data['account_id'],
                market=data['market'],
                side=data['side'],
                status=data['status'],
                price=data['price'],
                amount=data['amount'],
                filled=data.get('filled', 0.0),
                trigger=data.get('trigger'),
                good_til=good_til,
                execution_price=data.get('execution_price'),
                created_at=datetime.utcnow()
            )
            db.session.add(new_order)
            db.session.commit()

            # Create a corresponding transaction if necessary
            transaction_amount = new_order.price * new_order.amount
            if new_order.side.lower() == 'buy':
                transaction_type = 'Debit'
            else:
                transaction_type = 'Credit'

            new_transaction = Transaction(
                account_id=data['account_id'],
                type='Order Placement',
                amount=transaction_amount,
                created_at=datetime.utcnow()
            )
            db.session.add(new_transaction)
            db.session.commit()

            return jsonify(new_order.to_dict()), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 400
    else:
        return jsonify({"error": "Account not found or unauthorized"}), 404

@order_bp.route('/orders/<int:order_id>', methods=['PUT'])
@login_required
def update_order(order_id):
    order = Order.query.join(Account).filter(Order.id == order_id, Account.user_id == current_user.id).first()
    if order:
        data = request.get_json()
        try:
            order.market = data.get('market', order.market)
            order.side = data.get('side', order.side)
            order.status = data.get('status', order.status)
            order.price = data.get('price', order.price)
            order.amount = data.get('amount', order.amount)
            order.filled = data.get('filled', order.filled)
            order.trigger = data.get('trigger', order.trigger)

            # Parse 'good_til' if it's provided
            good_til = data.get('good_til', order.good_til)
            if good_til:
                order.good_til = parser.parse(good_til)
            else:
                order.good_til = None

            order.execution_price = data.get('execution_price', order.execution_price)
            order.updated_at = datetime.utcnow()
            db.session.commit()
            return jsonify(order.to_dict()), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 400
    else:
        return jsonify({"error": "Order not found or unauthorized"}), 404

@order_bp.route('/orders/<int:order_id>', methods=['DELETE'])
@login_required
def delete_order(order_id):
    order = Order.query.join(Account).filter(Order.id == order_id, Account.user_id == current_user.id).first()
    if order:
        db.session.delete(order)
        db.session.commit()
        return jsonify({"message": "Order deleted successfully"}), 200
    else:
        return jsonify({"error": "Order not found or unauthorized"}), 404
