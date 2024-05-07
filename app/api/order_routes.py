from flask import Blueprint, request, jsonify
from app.models import User, db, Order, Transaction

order_bp = Blueprint('order_bp', __name__)


@order_bp.route('/orders', methods=['GET'])
def get_all_orders():
    orders = Order.query.all()
    return jsonify([order.to_dict() for order in orders]), 200


@order_bp.route('/orders/<int:order_id>', methods=['GET'])
def get_order_detail(order_id):
    order = Order.query.get(order_id)
    if order:
        return jsonify(order.to_dict()), 200
    else:
        return jsonify({"error": "Order not found"}), 404


@order_bp.route('/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    new_order = Order(account_id=data['account_id'], type=data['type'], status=data['status'],
                      price=data['price'], quantity=data['quantity'])
    db.session.add(new_order)
    db.session.commit()


    new_transaction = Transaction(account_id=data['account_id'], type='Order Placement', amount=new_order.price * new_order.quantity)
    db.session.add(new_transaction)
    db.session.commit()

    return jsonify(new_order.to_dict()), 201


@order_bp.route('/orders/<int:order_id>', methods=['PUT'])
def update_order(order_id):
    order = Order.query.get(order_id)
    if order:
        data = request.get_json()
        order.type = data.get('type', order.type)
        order.status = data.get('status', order.status)
        order.price = data.get('price', order.price)
        order.quantity = data.get('quantity', order.quantity)
        db.session.commit()
        return jsonify(order.to_dict()), 200
    else:
        return jsonify({"error": "Order not found"}), 404


@order_bp.route('/orders/<int:order_id>', methods=['DELETE'])
def delete_order(order_id):
    order = Order.query.get(order_id)
    if order:
        db.session.delete(order)
        db.session.commit()
        return jsonify({"message": "Order deleted successfully"}), 200
    else:
        return jsonify({"error": "Order not found"}), 404
