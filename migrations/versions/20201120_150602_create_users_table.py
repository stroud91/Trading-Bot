"""create_users_table

Revision ID: ffdc0a98111c
Revises:
Create Date: 2020-11-20 15:06:02.230689

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = 'ffdc0a98111c'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('users',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('username', sa.String(length=40), nullable=False, unique=True),
                    sa.Column('email', sa.String(length=255), nullable=False, unique=True),
                    sa.Column('hashed_password', sa.String(length=255), nullable=False),
                    sa.Column('created_at', sa.DateTime(), nullable=True, default=sa.func.current_timestamp()),
                    sa.Column('updated_at', sa.DateTime(), nullable=True, default=sa.func.current_timestamp()),
                    sa.Column('last_login', sa.DateTime(), nullable=True),
                    sa.PrimaryKeyConstraint('id')
                    )

    op.create_table('accounts',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('user_id', sa.Integer(), sa.ForeignKey('users.id'), nullable=False),
                    sa.Column('balance', sa.Float(), nullable=False),
                    sa.Column('account_type', sa.String(length=50), nullable=False),
                    sa.Column('status', sa.String(length=20), default='active'),
                    sa.Column('created_at', sa.DateTime(), nullable=True, default=sa.func.current_timestamp()),
                    sa.Column('updated_at', sa.DateTime(), nullable=True, default=sa.func.current_timestamp()),
                    sa.PrimaryKeyConstraint('id')
                    )

    op.create_table('transactions',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('account_id', sa.Integer(), sa.ForeignKey('accounts.id'), nullable=False),
                    sa.Column('market', sa.String(length=50), nullable=False),
                    sa.Column('side', sa.String(length=10), nullable=False),
                    sa.Column('size', sa.Float(), nullable=False),
                    sa.Column('leverage', sa.Float(), nullable=False),
                    sa.Column('liquidation_price', sa.Float(), nullable=False),
                    sa.Column('unrealized_pnl', sa.Float(), nullable=False, server_default='0.0'),
                    sa.Column('realized_pnl', sa.Float(), nullable=False, server_default='0.0'),
                    sa.Column('avg_open_price', sa.Float(), nullable=False),
                    sa.Column('avg_close_price', sa.Float(), nullable=True),
                    sa.Column('created_at', sa.DateTime(), nullable=True, server_default=sa.func.current_timestamp()),
                    sa.Column('updated_at', sa.DateTime(), nullable=True, server_default=sa.func.current_timestamp(), onupdate=sa.func.current_timestamp()),
                    sa.PrimaryKeyConstraint('id')
                    )

    op.create_table('orders',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('account_id', sa.Integer(), sa.ForeignKey('accounts.id'), nullable=False),
                    sa.Column('market', sa.String(length=50), nullable=False),
                    sa.Column('side', sa.String(length=10), nullable=False),
                    sa.Column('status', sa.String(length=50), nullable=False),
                    sa.Column('price', sa.Float(), nullable=False),
                    sa.Column('amount', sa.Float(), nullable=False),
                    sa.Column('filled', sa.Float(), nullable=False, default=0.0),
                    sa.Column('trigger', sa.String(length=50)),
                    sa.Column('good_til', sa.DateTime()),
                    sa.Column('execution_price', sa.Float()),
                    sa.Column('created_at', sa.DateTime(), nullable=True, default=sa.func.current_timestamp()),
                    sa.Column('updated_at', sa.DateTime(), nullable=True, default=sa.func.current_timestamp()),
                    sa.PrimaryKeyConstraint('id')
                    )

    op.create_table('market_data',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('asset_type', sa.String(length=50), nullable=False),
                    sa.Column('price', sa.Float(), nullable=False),
                    sa.Column('high', sa.Float(), nullable=False),
                    sa.Column('low', sa.Float(), nullable=False),
                    sa.Column('open', sa.Float(), nullable=False),
                    sa.Column('close', sa.Float(), nullable=False),
                    sa.Column('volume', sa.Float(), nullable=False),
                    sa.Column('date_time', sa.DateTime(), nullable=False),
                    sa.Column('created_at', sa.DateTime(), nullable=True, default=sa.func.current_timestamp()),
                    sa.Column('updated_at', sa.DateTime(), nullable=True, default=sa.func.current_timestamp()),
                    sa.PrimaryKeyConstraint('id')
                    )

    op.create_table('news',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('title', sa.String(length=255), nullable=False),
        sa.Column('publication_date', sa.DateTime(), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('url', sa.String(length=255), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###qqqqqqqqq


def downgrade():
    op.drop_table('market_data')
    op.drop_table('orders')
    op.drop_table('transactions')
    op.drop_table('accounts')
    op.drop_table('users')
