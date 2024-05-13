from app.models import db, Account, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_accounts():
    accounts = [
        Account(user_id=1, balance=1000.0, account_type='savings', created_at=datetime.utcnow()),
        Account(user_id=1, balance=1500.0, account_type='checking', created_at=datetime.utcnow()),
        Account(user_id=2, balance=2000.0, account_type='savings', created_at=datetime.utcnow()),
        Account(user_id=2, balance=2500.0, account_type='checking', created_at=datetime.utcnow()),
        Account(user_id=3, balance=3000.0, account_type='savings', created_at=datetime.utcnow()),
        Account(user_id=3, balance=3500.0, account_type='checking', created_at=datetime.utcnow()),
        Account(user_id=4, balance=4000.0, account_type='savings', created_at=datetime.utcnow()),
        Account(user_id=4, balance=4500.0, account_type='checking', created_at=datetime.utcnow()),
        Account(user_id=5, balance=5000.0, account_type='savings', created_at=datetime.utcnow()),
        Account(user_id=5, balance=5500.0, account_type='checking', created_at=datetime.utcnow()),
         Account(user_id=6, balance=6000.0, account_type='savings', created_at=datetime.utcnow()),
        Account(user_id=6, balance=6500.0, account_type='checking', created_at=datetime.utcnow()),
        Account(user_id=7, balance=7000.0, account_type='savings', created_at=datetime.utcnow()),
        Account(user_id=7, balance=7500.0, account_type='checking', created_at=datetime.utcnow()),
        Account(user_id=8, balance=8000.0, account_type='savings', created_at=datetime.utcnow()),
        Account(user_id=8, balance=8500.0, account_type='checking', created_at=datetime.utcnow()),
        Account(user_id=9, balance=9000.0, account_type='savings', created_at=datetime.utcnow()),
        Account(user_id=9, balance=9500.0, account_type='checking', created_at=datetime.utcnow()),
        Account(user_id=10, balance=10000.0, account_type='savings', created_at=datetime.utcnow()),
        Account(user_id=10, balance=10500.0, account_type='checking', created_at=datetime.utcnow()),
        Account(user_id=11, balance=11000.0, account_type='savings', created_at=datetime.utcnow()),
        Account(user_id=11, balance=11500.0, account_type='checking', created_at=datetime.utcnow()),
        Account(user_id=12, balance=12000.0, account_type='savings', created_at=datetime.utcnow()),
        Account(user_id=12, balance=12500.0, account_type='checking', created_at=datetime.utcnow()),
        Account(user_id=13, balance=13000.0, account_type='savings', created_at=datetime.utcnow()),
        Account(user_id=13, balance=13500.0, account_type='checking', created_at=datetime.utcnow()),
        Account(user_id=14, balance=14000.0, account_type='savings', created_at=datetime.utcnow()),
        Account(user_id=14, balance=14500.0, account_type='checking', created_at=datetime.utcnow()),
        Account(user_id=14, balance=15000.0, account_type='savings', created_at=datetime.utcnow()),
        Account(user_id=15, balance=15500.0, account_type='checking', created_at=datetime.utcnow()),
        Account(user_id=15, balance=16000.0, account_type='savings', created_at=datetime.utcnow()),
        Account(user_id=16, balance=16500.0, account_type='checking', created_at=datetime.utcnow()),
        Account(user_id=16, balance=17000.0, account_type='savings', created_at=datetime.utcnow()),
        Account(user_id=17, balance=17500.0, account_type='checking', created_at=datetime.utcnow()),
        Account(user_id=17, balance=18000.0, account_type='savings', created_at=datetime.utcnow()),
        Account(user_id=18, balance=18500.0, account_type='checking', created_at=datetime.utcnow()),
        Account(user_id=18, balance=19000.0, account_type='savings', created_at=datetime.utcnow()),
        Account(user_id=19, balance=19500.0, account_type='checking', created_at=datetime.utcnow()),
        Account(user_id=19, balance=20000.0, account_type='savings', created_at=datetime.utcnow()),
        Account(user_id=20, balance=20500.0, account_type='checking', created_at=datetime.utcnow()),
        Account(user_id=20, balance=21000.0, account_type='savings', created_at=datetime.utcnow()),
    ]
    db.session.bulk_save_objects(accounts)
    db.session.commit()
    print("Accounts seeded")


def undo_accounts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.accounts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM accounts"))

    db.session.commit()
