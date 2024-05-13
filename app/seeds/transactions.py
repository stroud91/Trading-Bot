from app.models import db, Transaction, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_transactions():
    transactions = [
        Transaction(account_id=1, type='deposit', amount=500.00, created_at=datetime.utcnow()),
        Transaction(account_id=2, type='withdrawal', amount=300.00, created_at=datetime.utcnow()),
        Transaction(account_id=3, type='deposit', amount=450.00, created_at=datetime.utcnow()),
        Transaction(account_id=4, type='withdrawal', amount=250.00, created_at=datetime.utcnow()),
        Transaction(account_id=5, type='deposit', amount=700.00, created_at=datetime.utcnow()),
        Transaction(account_id=6, type='withdrawal', amount=500.00, created_at=datetime.utcnow()),
        Transaction(account_id=7, type='deposit', amount=600.00, created_at=datetime.utcnow()),
        Transaction(account_id=8, type='withdrawal', amount=400.00, created_at=datetime.utcnow()),
        Transaction(account_id=9, type='deposit', amount=1000.00, created_at=datetime.utcnow()),
        Transaction(account_id=10, type='withdrawal', amount=800.00, created_at=datetime.utcnow()),
        Transaction(account_id=11, type='deposit', amount=500.00, created_at=datetime.utcnow()),
        Transaction(account_id=12, type='withdrawal', amount=350.00, created_at=datetime.utcnow()),
        Transaction(account_id=13, type='deposit', amount=450.00, created_at=datetime.utcnow()),
        Transaction(account_id=14, type='withdrawal', amount=300.00, created_at=datetime.utcnow()),
        Transaction(account_id=15, type='deposit', amount=650.00, created_at=datetime.utcnow()),
        Transaction(account_id=16, type='withdrawal', amount=550.00, created_at=datetime.utcnow()),
        Transaction(account_id=17, type='deposit', amount=750.00, created_at=datetime.utcnow()),
        Transaction(account_id=18, type='withdrawal', amount=650.00, created_at=datetime.utcnow()),
        Transaction(account_id=19, type='deposit', amount=850.00, created_at=datetime.utcnow()),
        Transaction(account_id=20, type='withdrawal', amount=750.00, created_at=datetime.utcnow()),
        Transaction(account_id=21, type='deposit', amount=950.00, created_at=datetime.utcnow()),
        Transaction(account_id=22, type='withdrawal', amount=850.00, created_at=datetime.utcnow()),
        Transaction(account_id=23, type='deposit', amount=1050.00, created_at=datetime.utcnow()),
        Transaction(account_id=24, type='withdrawal', amount=950.00, created_at=datetime.utcnow()),
        Transaction(account_id=25, type='deposit', amount=1150.00, created_at=datetime.utcnow()),
        Transaction(account_id=26, type='withdrawal', amount=1050.00, created_at=datetime.utcnow()),
        Transaction(account_id=27, type='deposit', amount=1250.00, created_at=datetime.utcnow()),
        Transaction(account_id=28, type='withdrawal', amount=1150.00, created_at=datetime.utcnow()),
        Transaction(account_id=29, type='deposit', amount=1350.00, created_at=datetime.utcnow()),
        Transaction(account_id=30, type='withdrawal', amount=1250.00, created_at=datetime.utcnow()),
        Transaction(account_id=31, type='deposit', amount=1450.00, created_at=datetime.utcnow()),
        Transaction(account_id=32, type='withdrawal', amount=1350.00, created_at=datetime.utcnow()),
        Transaction(account_id=33, type='deposit', amount=1550.00, created_at=datetime.utcnow()),
        Transaction(account_id=34, type='withdrawal', amount=1450.00, created_at=datetime.utcnow()),
        Transaction(account_id=35, type='deposit', amount=1650.00, created_at=datetime.utcnow()),
        Transaction(account_id=36, type='withdrawal', amount=1550.00, created_at=datetime.utcnow()),
        Transaction(account_id=37, type='deposit', amount=1750.00, created_at=datetime.utcnow()),
        Transaction(account_id=38, type='withdrawal', amount=1650.00, created_at=datetime.utcnow()),
        Transaction(account_id=39, type='deposit', amount=1850.00, created_at=datetime.utcnow()),
        Transaction(account_id=40, type='withdrawal', amount=1750.00, created_at=datetime.utcnow()),
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
