from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text



def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password2')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password3')
    alice = User(username='Alice', email='alice@aa.io', password=('password4'))
    bob = User(username='Bob', email='bob@aa.io', password=('password5'))
    charlie = User(username='Charlie', email='charlie@aa.io', password=('password6'))
    david = User(username='David', email='david@aa.io', password=('password7'))
    eve = User(username='Eve', email='eve@aa.io', password=('password8'))
    frank = User(username='Frank', email='frank@aa.io', password=('password9'))
    grace = User(username='Grace', email='grace@aa.io', password=('password11'))
    hannah = User(username='Hannah', email='hannah@aa.io', password=('password22'))
    isaac = User(username='Isaac', email='isaac@aa.io', password=('password33'))
    jack = User(username='Jack', email='jack@aa.io', password=('password44'))
    karen = User(username='Karen', email='karen@aa.io', password=('password55'))
    leo = User(username='Leo', email='leo@aa.io', password=('password66'))
    mia = User(username='Mia', email='mia@aa.io', password=('password77'))
    noah = User(username='Noah', email='noah@aa.io', password=('password88'))
    olivia = User(username='Olivia', email='olivia@aa.io', password=('password99'))
    paul = User(username='Paul', email='paul@aa.io', password=('password111'))
    quincy = User(username='Quincy', email='quincy@aa.io', password=('password222'))
    rachel = User(username='Rachel', email='rachel@aa.io', password=('password333'))
    sarah = User(username='Sarah', email='sarah@aa.io', password=('password444'))
    tom = User(username='Tom', email='tom@aa.io', password=('password555'))
    uma = User(username='Uma', email='uma@aa.io', password=('password666'))
    vicky = User(username='Vicky', email='vicky@aa.io', password=('password777'))
    walter = User(username='Walter', email='walter@aa.io', password=('password888'))
    xena = User(username='Xena', email='xena@aa.io', password=('password999'))
    yara = User(username='Yara', email='yara@aa.io', password=('password1111'))
    zack = User(username='Zack', email='zack@aa.io', password=('password2222'))
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
