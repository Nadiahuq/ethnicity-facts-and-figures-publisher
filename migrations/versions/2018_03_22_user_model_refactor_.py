"""empty message

Revision ID: 2018_03_22_user_model_refactor
Revises: 2018_03_20_remove_unused_fields
Create Date: 2018-03-22 10:23:42.850491

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from application.auth.models import User

Session = sessionmaker()
Base = declarative_base()

# revision identifiers, used by Alembic.
revision = '2018_03_22_user_model_refactor'
down_revision = '2018_03_20_remove_unused_fields'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('capabilities', postgresql.ARRAY(sa.String()), nullable=True))

    bind = op.get_bind()
    session = Session(bind=bind)

    users = session.query(User).all()
    for user in users:
        capablities = [role.name for role in user.roles]
        user.capabilities = capablities
        session.add(user)

    session.commit()
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'capabilities')
    # ### end Alembic commands ###
