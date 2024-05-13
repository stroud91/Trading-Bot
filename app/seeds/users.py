from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text



def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    alice = User(username='Alice', email='alice@aa.io', hashed_password=generate_password_hash('password'))
    bob = User(username='Bob', email='bob@aa.io', hashed_password=generate_password_hash('password'))
    charlie = User(username='Charlie', email='charlie@aa.io', hashed_password=generate_password_hash('password'))
    david = User(username='David', email='david@aa.io', hashed_password=generate_password_hash('password'))
    eve = User(username='Eve', email='eve@aa.io', hashed_password=generate_password_hash('password'))
    frank = User(username='Frank', email='frank@aa.io', hashed_password=generate_password_hash('password'))
    grace = User(username='Grace', email='grace@aa.io', hashed_password=generate_password_hash('password'))
    hannah = User(username='Hannah', email='hannah@aa.io', hashed_password=generate_password_hash('password'))
    isaac = User(username='Isaac', email='isaac@aa.io', hashed_password=generate_password_hash('password'))
    jack = User(username='Jack', email='jack@aa.io', hashed_password=generate_password_hash('password'))
    karen = User(username='Karen', email='karen@aa.io', hashed_password=generate_password_hash('password'))
    leo = User(username='Leo', email='leo@aa.io', hashed_password=generate_password_hash('password'))
    mia = User(username='Mia', email='mia@aa.io', hashed_password=generate_password_hash('password'))
    noah = User(username='Noah', email='noah@aa.io', hashed_password=generate_password_hash('password'))
    olivia = User(username='Olivia', email='olivia@aa.io', hashed_password=generate_password_hash('password'))
    paul = User(username='Paul', email='paul@aa.io', hashed_password=generate_password_hash('password'))
    quincy = User(username='Quincy', email='quincy@aa.io', hashed_password=generate_password_hash('password'))
    rachel = User(username='Rachel', email='rachel@aa.io', hashed_password=generate_password_hash('password'))
    sarah = User(username='Sarah', email='sarah@aa.io', hashed_password=generate_password_hash('password'))
    tom = User(username='Tom', email='tom@aa.io', hashed_password=generate_password_hash('password'))
    uma = User(username='Uma', email='uma@aa.io', hashed_password=generate_password_hash('password'))
    vicky = User(username='Vicky', email='vicky@aa.io', hashed_password=generate_password_hash('password'))
    walter = User(username='Walter', email='walter@aa.io', hashed_password=generate_password_hash('password'))
    xena = User(username='Xena', email='xena@aa.io', hashed_password=generate_password_hash('password'))
    yara = User(username='Yara', email='yara@aa.io', hashed_password=generate_password_hash('password'))
    zack = User(username='Zack', email='zack@aa.io', hashed_password=generate_password_hash('password'))
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(alice)
    db.session.add(bob)
    db.session.add(charlie)
    db.session.add(david)
    db.session.add(eve)
    db.session.add(frank)
    db.session.add(grace)
    db.session.add(hannah)
    db.session.add(isaac)
    db.session.add(jack)
    db.session.add(karen)
    db.session.add(leo)
    db.session.add(mia)
    db.session.add(noah)
    db.session.add(olivia)
    db.session.add(paul)
    db.session.add(quincy)
    db.session.add(rachel)
    db.session.add(sarah)
    db.session.add(tom)
    db.session.add(uma)
    db.session.add(vicky)
    db.session.add(walter)
    db.session.add(xena)
    db.session.add(yara)
    db.session.add(zack)
    db.session.commit()


def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
