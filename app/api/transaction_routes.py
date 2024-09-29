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
    account = Account.query.get(data.get('account_id'))
    if account and account.user_id == current_user.id:
        try:
            new_transaction = Transaction(
                account_id=data['account_id'],
                market=data['market'],
                side=data['side'],
                size=data['size'],
                leverage=data['leverage'],
                liquidation_price=data['liquidation_price'],
                unrealized_pnl=data.get('unrealized_pnl', 0.0),
                realized_pnl=data.get('realized_pnl', 0.0),
                avg_open_price=data['avg_open_price'],
                avg_close_price=data.get('avg_close_price'),
                created_at=datetime.utcnow()
            )
            db.session.add(new_transaction)
            db.session.commit()
            return jsonify(new_transaction.to_dict()), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 400
    else:
        return jsonify({"error": "Account not found or unauthorized"}), 404

@transaction_bp.route('/transactions/<int:transaction_id>', methods=['PUT'])
@login_required
def update_transaction(transaction_id):
    transaction = Transaction.query.join(Account).filter(Transaction.id == transaction_id, Account.user_id == current_user.id).first()
    if transaction:
        data = request.get_json()
        try:
            transaction.market = data.get('market', transaction.market)
            transaction.side = data.get('side', transaction.side)
            transaction.size = data.get('size', transaction.size)
            transaction.leverage = data.get('leverage', transaction.leverage)
            transaction.liquidation_price = data.get('liquidation_price', transaction.liquidation_price)
            transaction.unrealized_pnl = data.get('unrealized_pnl', transaction.unrealized_pnl)
            transaction.realized_pnl = data.get('realized_pnl', transaction.realized_pnl)
            transaction.avg_open_price = data.get('avg_open_price', transaction.avg_open_price)
            transaction.avg_close_price = data.get('avg_close_price', transaction.avg_close_price)
            transaction.updated_at = datetime.utcnow()
            db.session.commit()
            return jsonify(transaction.to_dict()), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 400
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
