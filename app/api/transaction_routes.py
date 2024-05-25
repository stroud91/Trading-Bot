from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.models import db, Transaction, Account
from datetime import datetime

transaction_bp = Blueprint('transaction_bp', __name__)

@transaction_bp.route('/transactions', methods=['GET'])
@login_required
def get_all_transactions():
    transactions = Transaction.query.join(Account).filter(Account.user_id == current_user.id).all()
    return jsonify([transaction.to_dict() for transaction in transactions]), 200

@transaction_bp.route('/transactions/<int:transaction_id>', methods=['GET'])
@login_required
def get_transaction_detail(transaction_id):
    transaction = Transaction.query.join(Account).filter(Transaction.id == transaction_id, Account.user_id == current_user.id).first()
    if transaction:
        return jsonify(transaction.to_dict()), 200
    else:
        return jsonify({"error": "Transaction not found or unauthorized"}), 404

@transaction_bp.route('/transactions', methods=['POST'])
@login_required
def create_transaction():
    data = request.get_json()
    account = Account.query.get(data['account_id'])
    if account and account.user_id == current_user.id:
        new_transaction = Transaction(
            account_id=data['account_id'],
            transaction_type=data['type'],
            amount=data['amount'],
            created_at=datetime.utcnow()
        )
        db.session.add(new_transaction)
        db.session.commit()
        return jsonify(new_transaction.to_dict()), 201
    else:
        return jsonify({"error": "Account not found or unauthorized"}), 404

@transaction_bp.route('/transactions/<int:transaction_id>', methods=['PUT'])
@login_required
def update_transaction(transaction_id):
    transaction = Transaction.query.join(Account).filter(Transaction.id == transaction_id, Account.user_id == current_user.id).first()
    if transaction:
        data = request.get_json()
        transaction.transaction_type = data.get('type', transaction.transaction_type)
        transaction.amount = data.get('amount', transaction.amount)
        transaction.updated_at = datetime.utcnow()
        db.session.commit()
        return jsonify(transaction.to_dict()), 200
    else:
        return jsonify({"error": "Transaction not found or unauthorized"}), 404

@transaction_bp.route('/transactions/<int:transaction_id>', methods=['DELETE'])
@login_required
def delete_transaction(transaction_id):
    transaction = Transaction.query.join(Account).filter(Transaction.id == transaction_id, Account.user_id == current_user.id).first()
    if transaction:
        db.session.delete(transaction)
        db.session.commit()
        return jsonify({"message": "Transaction deleted successfully"}), 200
    else:
        return jsonify({"error": "Transaction not found or unauthorized"}), 404
