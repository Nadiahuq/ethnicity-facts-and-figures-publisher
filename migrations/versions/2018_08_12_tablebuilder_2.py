"""Add table builder 2 columns to page table

Revision ID: 2018_08_12_tablebuilder_2
Revises: 2018_07_28_redirects
Create Date: 2018-08-13 10:45:00.671306

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = "2018_08_12_tablebuilder_2"
down_revision = "2018_07_28_redirects"
branch_labels = None
depends_on = None


def upgrade():
    op.add_column("dimension", sa.Column("table_2_source_data", postgresql.JSON(astext_type=sa.Text()), nullable=True))
    op.add_column("dimension", sa.Column("table_builder_version", sa.Integer(), nullable=True))


def downgrade():
    op.drop_column("dimension", "table_builder_version")
    op.drop_column("dimension", "table_2_source_data")
