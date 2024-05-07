from app.models import db, Transaction, environment, SCHEMA
from sqlalchemy.sql import text

def seed_transactions():
    transactions = [
        Transaction(account_id=1, type='deposit', amount=1000.00),
        Transaction(account_id=2, type='deposit', amount=1500.00),
        Transaction(account_id=3, type='deposit', amount=2000.00)
    ]
    db.session.bulk_save_objects(transactions)
    db.session.commit()
    print("Transactions seeded")


def undo_transactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.transactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM transactions"))

    db.session.commit()
