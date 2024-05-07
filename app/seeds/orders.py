from app.models import db, Order, environment, SCHEMA
from sqlalchemy.sql import text

def seed_orders():
    orders = [
        Order(account_id=1, type='buy', status='completed', price=100.00, quantity=10),
        Order(account_id=2, type='sell', status='pending', price=150.00, quantity=5),
        Order(account_id=3, type='buy', status='completed', price=200.00, quantity=20)
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
