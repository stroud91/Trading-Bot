from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.models import db, Order, Transaction, Account
from datetime import datetime

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
    account = Account.query.get(data['account_id'])
    if account and account.user_id == current_user.id:
        new_order = Order(
            account_id=data['account_id'],
            type=data['type'],
            status=data['status'],
            price=data['price'],
            quantity=data['quantity'],
            created_at=datetime.utcnow()
        )
        db.session.add(new_order)
        db.session.commit()

        # Create a corresponding transaction
        new_transaction = Transaction(
            account_id=data['account_id'],
            type='Order Placement',
            amount=new_order.price * new_order.quantity,
            created_at=datetime.utcnow()
        )
        db.session.add(new_transaction)
        db.session.commit()

        return jsonify(new_order.to_dict()), 201
    else:
        return jsonify({"error": "Account not found or unauthorized"}), 404

@order_bp.route('/orders/<int:order_id>', methods=['PUT'])
@login_required
def update_order(order_id):
    order = Order.query.join(Account).filter(Order.id == order_id, Account.user_id == current_user.id).first()
    if order:
        data = request.get_json()
        order.type = data.get('type', order.type)
        order.status = data.get('status', order.status)
        order.price = data.get('price', order.price)
        order.quantity = data.get('quantity', order.quantity)
        order.updated_at = datetime.utcnow()
        db.session.commit()
        return jsonify(order.to_dict()), 200
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
