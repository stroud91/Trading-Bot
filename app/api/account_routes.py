from flask import Blueprint, request, jsonify
from app.models import Account, User, db
from flask_login import current_user, login_required
from datetime import datetime

account_bp = Blueprint('account_bp', __name__)

@account_bp.route('/accounts', methods=['GET'])
@login_required
def get_all_accounts():
    accounts = Account.query.filter_by(user_id=current_user.id).all()
    return jsonify([account.to_dict() for account in accounts]), 200

@account_bp.route('/accounts/<int:account_id>', methods=['GET'])
@login_required
def get_account_detail(account_id):
    account = Account.query.get(account_id)
    if account and account.user_id == current_user.id:
        return jsonify(account.to_dict()), 200
    else:
        return jsonify({"error": "Account not found or unauthorized"}), 404

@account_bp.route('/accounts', methods=['POST'])
@login_required
def create_account():
    data = request.get_json()
    new_account = Account(
        user_id=current_user.id,
        balance=data['balance'],
        account_type=data['account_type'],
        status=data.get('status', 'active')
    )
    db.session.add(new_account)
    db.session.commit()
    return jsonify(new_account.to_dict()), 201

@account_bp.route('/accounts/<int:account_id>', methods=['PUT'])
@login_required
def update_account(account_id):
    account = Account.query.get(account_id)
    if account and account.user_id == current_user.id:
        data = request.get_json()
        account.balance = data.get('balance', account.balance)
        account.account_type = data.get('account_type', account.account_type)
        account.status = data.get('status', account.status)
        account.updated_at = datetime.utcnow()
        db.session.commit()
        return jsonify(account.to_dict()), 200
    else:
        return jsonify({"error": "Account not found or unauthorized"}), 404

@account_bp.route('/accounts/<int:account_id>', methods=['DELETE'])
@login_required
def delete_account(account_id):
    account = Account.query.get(account_id)
    if account and account.user_id == current_user.id:
        db.session.delete(account)
        db.session.commit()
        return jsonify({"message": "Account deleted successfully"}), 200
    else:
        return jsonify({"error": "Account not found or unauthorized"}), 404

@account_bp.route('/account/<int:account_id>/balance_history', methods=['GET'])
@login_required
def get_balance_history(account_id):
    account = Account.query.get(account_id)
    if not account or account.user_id != current_user.id:
        return jsonify({"error": "Account not found or unauthorized"}), 404

    balance_history = Account.query.filter_by(account_id=account_id).order_by(Account.date.asc()).all()
    history_data = [{
        'date': history.date.strftime('%Y-%m-%d'),
        'balance': history.balance
    } for history in balance_history]

    return jsonify(history_data), 200
