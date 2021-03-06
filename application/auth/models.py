import enum

from flask_security import UserMixin
from sqlalchemy.dialects.postgresql import ARRAY
from application import db
from sqlalchemy.ext.mutable import MutableList


class TypeOfUser(enum.Enum):
    RDU_USER = "RDU user"
    DEPT_USER = "Departmental user"
    ADMIN_USER = "RDU admin"
    DEV_USER = "RDU developer"


COPY_MEASURE = "copy_measure"
CREATE_MEASURE = "create_measure"
CREATE_VERSION = "create_version"
DELETE_MEASURE = "delete_measure"
MANAGE_SYSTEM = "manage_system"
MANAGE_USERS = "manage_users"
ORDER_MEASURES = "order_measures"
PUBLISH = "publish"
READ = "read"
UPDATE_MEASURE = "update_measure"
VIEW_DASHBOARDS = "view_dashboards"

DEPT = [READ, UPDATE_MEASURE, CREATE_VERSION]
RDU = DEPT + [CREATE_MEASURE, DELETE_MEASURE, VIEW_DASHBOARDS]
ADMIN = RDU + [PUBLISH, MANAGE_USERS, ORDER_MEASURES]
DEV = ADMIN + [COPY_MEASURE, MANAGE_SYSTEM]

CAPABILITIES = {
    TypeOfUser.DEPT_USER: DEPT,
    TypeOfUser.RDU_USER: RDU,
    TypeOfUser.ADMIN_USER: ADMIN,
    TypeOfUser.DEV_USER: DEV,
}


class RoleFreeUserMixin(UserMixin):
    def has_role(self, role):
        return role in self.capabilities


class User(db.Model, RoleFreeUserMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))
    active = db.Column(db.Boolean(), default=False)
    confirmed_at = db.Column(db.DateTime())
    user_type = db.Column(db.Enum(TypeOfUser, name="type_of_user_types"), nullable=False)
    capabilities = db.Column(MutableList.as_mutable(ARRAY(db.String)), default=[])

    def user_name(self):
        return self.email.split("@")[0]

    def is_departmental_user(self):
        return self.user_type == TypeOfUser.DEPT_USER

    def is_rdu_user(self):
        return self.user_type == TypeOfUser.RDU_USER

    def is_admin_user(self):
        return self.user_type == TypeOfUser.ADMIN_USER

    def can(self, capability):
        return capability in self.capabilities

    def can_access(self, page_id):
        if self.user_type != TypeOfUser.DEPT_USER:
            return True
        else:
            for page in self.pages:
                if page.guid == page_id or page.uri == page_id:
                    return True
            else:
                return False
