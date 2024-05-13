from app.models import db, Order, environment, SCHEMA
from sqlalchemy.sql import text

def seed_orders():
    orders = [
        Order(account_id=1, type='buy', status='completed', price=200.50, quantity=10, execution_price=200.50, created_at=datetime.utcnow()),
        Order(account_id=2, type='sell', status='pending', price=150.00, quantity=5, execution_price=150.00, created_at=datetime.utcnow()),
        Order(account_id=3, type='buy', status='completed', price=250.75, quantity=15, execution_price=250.75, created_at=datetime.utcnow()),
        Order(account_id=4, type='sell', status='pending', price=350.40, quantity=20, execution_price=350.40, created_at=datetime.utcnow()),
        Order(account_id=5, type='buy', status='completed', price=450.00, quantity=25, execution_price=450.00, created_at=datetime.utcnow()),
        Order(account_id=6, type='sell', status='pending', price=550.50, quantity=30, execution_price=550.50, created_at=datetime.utcnow()),
        Order(account_id=7, type='buy', status='completed', price=650.25, quantity=35, execution_price=650.25, created_at=datetime.utcnow()),
        Order(account_id=8, type='sell', status='pending', price=750.75, quantity=40, execution_price=750.75, created_at=datetime.utcnow()),
        Order(account_id=9, type='buy', status='completed', price=850.00, quantity=45, execution_price=850.00, created_at=datetime.utcnow()),
        Order(account_id=10, type='sell', status='pending', price=950.10, quantity=50, execution_price=950.10, created_at=datetime.utcnow()),
        Order(account_id=11, type='buy', status='completed', price=1050.30, quantity=5, execution_price=1050.30, created_at=datetime.utcnow()),
        Order(account_id=12, type='sell', status='pending', price=1150.20, quantity=10, execution_price=1150.20, created_at=datetime.utcnow()),
        Order(account_id=13, type='buy', status='completed', price=1250.10, quantity=15, execution_price=1250.10, created_at=datetime.utcnow()),
        Order(account_id=14, type='sell', status='pending', price=1350.05, quantity=20, execution_price=1350.05, created_at=datetime.utcnow()),
        Order(account_id=15, type='buy', status='completed', price=1450.00, quantity=25, execution_price=1450.00, created_at=datetime.utcnow()),
        Order(account_id=16, type='sell', status='pending', price=1550.50, quantity=30, execution_price=1550.50, created_at=datetime.utcnow()),
        Order(account_id=17, type='buy', status='completed', price=1650.75, quantity=35, execution_price=1650.75, created_at=datetime.utcnow()),
        Order(account_id=18, type='sell', status='pending', price=1750.25, quantity=40, execution_price=1750.25, created_at=datetime.utcnow()),
        Order(account_id=19, type='buy', status='completed', price=1850.50, quantity=45, execution_price=1850.50, created_at=datetime.utcnow()),
        Order(account_id=20, type='sell', status='pending', price=1950.00, quantity=50, execution_price=1950.00, created_at=datetime.utcnow()),
        Order(account_id=21, type='buy', status='completed', price=2050.75, quantity=5, execution_price=2050.75, created_at=datetime.utcnow()),
        Order(account_id=22, type='sell', status='pending', price=2150.50, quantity=10, execution_price=2150.50, created_at=datetime.utcnow()),
        Order(account_id=23, type='buy', status='completed', price=2250.25, quantity=15, execution_price=2250.25, created_at=datetime.utcnow()),
        Order(account_id=24, type='sell', status='pending', price=2350.00, quantity=20, execution_price=2350.00, created_at=datetime.utcnow()),
        Order(account_id=25, type='buy', status='completed', price=2450.75, quantity=25, execution_price=2450.00, created_at=datetime.utcnow())
    ]

    db.session.bulk_save_objects(orders)
    db.session.commit()
    print("Orders seeded")



def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orders"))

    db.session.commit()
