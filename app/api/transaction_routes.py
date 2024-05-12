from flask import Blueprint, request, jsonify
from app.models import Transaction, db
from datetime import datetime

transaction_bp = Blueprint('transaction_bp', __name__)

@transaction_bp.route('/transactions', methods=['GET'])
def get_all_transactions():
    transactions = Transaction.query.all()
    return jsonify([transaction.to_dict() for transaction in transactions]), 200

@transaction_bp.route('/transactions/<int:transaction_id>', methods=['GET'])
def get_transaction_detail(transaction_id):
    transaction = Transaction.query.get(transaction_id)
    if transaction:
        return jsonify(transaction.to_dict()), 200
    else:
        return jsonify({"error": "Transaction not found"}), 404

@transaction_bp.route('/transactions', methods=['POST'])
def create_transaction():
    data = request.get_json()
    new_transaction = Transaction(
        account_id=data['account_id'],
        transaction_type=data['type'],
        amount=data['amount'],
        created_at=datetime.utcnow()  # Ensuring the creation timestamp is set
    )
    db.session.add(new_transaction)
    db.session.commit()
    return jsonify(new_transaction.to_dict()), 201

@transaction_bp.route('/transactions/<int:transaction_id>', methods=['PUT'])
def update_transaction(transaction_id):
    transaction = Transaction.query.get(transaction_id)
    if transaction:
        data = request.get_json()
        transaction.transaction_type = data.get('type', transaction.transaction_type)
        transaction.amount = data.get('amount', transaction.amount)
        transaction.updated_at = datetime.utcnow()  # Update the 'updated_at' timestamp
        db.session.commit()
        return jsonify(transaction.to_dict()), 200
    else:
        return jsonify({"error": "Transaction not found"}), 404

@transaction_bp.route('/transactions/<int:transaction_id>', methods=['DELETE'])
def delete_transaction(transaction_id):
    transaction = Transaction.query.get(transaction_id)
    if transaction:
        db.session.delete(transaction)
        db.session.commit()
        return jsonify({"message": "Transaction deleted successfully"}), 200
    else:
        return jsonify({"error": "Transaction not found"}), 404
