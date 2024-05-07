from app.models import db, Account, environment, SCHEMA
from sqlalchemy.sql import text


def seed_accounts():
    accounts = [
        Account(user_id=1, balance=1000.00, account_type='savings'),
        Account(user_id=2, balance=1500.00, account_type='checking'),
        Account(user_id=3, balance=2000.00, account_type='investment')
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
