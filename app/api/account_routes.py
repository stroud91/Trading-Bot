from flask import Blueprint, request, jsonify
from app.models import Account, db
from datetime import datetime

account_bp = Blueprint('account_bp', __name__)

@account_bp.route('/accounts', methods=['GET'])
def get_all_accounts():
    accounts = Account.query.all()
    return jsonify([account.to_dict() for account in accounts]), 200

@account_bp.route('/accounts/<int:account_id>', methods=['GET'])
def get_account_detail(account_id):
    account = Account.query.get(account_id)
    if account:
        return jsonify(account.to_dict()), 200
    else:
        return jsonify({"error": "Account not found"}), 404

@account_bp.route('/accounts', methods=['POST'])
def create_account():
    data = request.get_json()
    new_account = Account(
        user_id=data['user_id'],
        balance=data['balance'],
        account_type=data['account_type'],
        status=data.get('status', 'active')
    )
    db.session.add(new_account)
    db.session.commit()
    return jsonify(new_account.to_dict()), 201

@account_bp.route('/accounts/<int:account_id>', methods=['PUT'])
def update_account(account_id):
    account = Account.query.get(account_id)
    if account:
        data = request.get_json()
        account.balance = data.get('balance', account.balance)
        account.account_type = data.get('account_type', account.account_type)
        account.status = data.get('status', account.status)
        account.updated_at = datetime.utcnow() 
        db.session.commit()
        return jsonify(account.to_dict()), 200
    else:
        return jsonify({"error": "Account not found"}), 404

@account_bp.route('/accounts/<int:account_id>', methods=['DELETE'])
def delete_account(account_id):
    account = Account.query.get(account_id)
    if account:
        db.session.delete(account)
        db.session.commit()
        return jsonify({"message": "Account deleted successfully"}), 200
    else:
        return jsonify({"error": "Account not found"}), 404


@account_bp.route('/account/<int:account_id>/balance_history', methods=['GET'])
def get_balance_history(account_id):
    account = Account.query.get(account_id)
    if not account:
        return jsonify({"error": "Account not found"}), 404

    balance_history = Account.query.filter_by(account_id=account_id).order_by(Account.date.asc()).all()
    history_data = [{
        'date': history.date.strftime('%Y-%m-%d'),
        'balance': history.balance
    } for history in balance_history]

    return jsonify(history_data), 200
