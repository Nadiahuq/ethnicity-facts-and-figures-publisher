import os

from flask import (
    Flask,
    render_template,
    redirect,
    url_for
)
from flask_security import (
    SQLAlchemyUserDatastore,
    Security
)

from raven.contrib.flask import Sentry

from application import db
from application.auth.models import (
    User,
    Role
)

from application.cms.filters import (
    format_page_guid,
    format_approve_button,
    format_as_title,
    truncate_words,
    format_date_time,

)

from application.cms.file_service import file_service

from application.static_site.filters import (
    render_markdown,
    breadcrumb_friendly
)


def create_app(config_object):

    from application.static_site import static_site_blueprint
    from application.cms import cms_blueprint
    from application.audit import audit_blueprint
    from application.prototype import prototype_blueprint

    app = Flask(__name__)
    app.config.from_object(config_object)

    file_service.init_app(app)
    db.init_app(app)

    user_datastore = SQLAlchemyUserDatastore(db, User, Role)
    Security(app, user_datastore)

    if os.environ.get('SENTRY_DSN') is not None:
        sentry = Sentry(app, dsn=os.environ['SENTRY_DSN'])

    app.register_blueprint(static_site_blueprint)
    app.register_blueprint(cms_blueprint)
    app.register_blueprint(audit_blueprint)
    app.register_blueprint(prototype_blueprint)

    register_errorhandlers(app)
    app.after_request(harden_app)

    app.add_template_filter(format_page_guid)
    app.add_template_filter(format_approve_button)
    app.add_template_filter(format_as_title)
    app.add_template_filter(truncate_words)
    app.add_template_filter(format_date_time)
    app.add_template_filter(render_markdown)
    app.add_template_filter(breadcrumb_friendly)
    setup_user_audit(app)

    # There is a CSS caching problem in chrome
    app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 10

    # Temporary jiggery pokery
    if app.config['RESEARCH']:
        app.before_request(redirect_for_research)

    # More temporary jiggery pokery
    # https://stackoverflow.com/questions/17135006/url-routing-conflicts-for-static-files-in-flask-dev-server
    app.before_request(get_the_favicon)

    return app


#  https://www.owasp.org/index.php/List_of_useful_HTTP_headers
def harden_app(response):
    response.headers.add('X-Frame-Options', 'deny')
    response.headers.add('X-Content-Type-Options', 'nosniff')
    response.headers.add('X-XSS-Protection', '1; mode=block')
    # response.headers.add('Content-Security-Policy', (
    #     "default-src 'self' 'unsafe-inline';"
    #     "script-src 'self' 'unsafe-inline' 'unsafe-eval' data:;"
    #     "object-src 'self';"
    #     "font-src 'self' data:;"
    # ))
    # wait and see for the content security policy stuff
    return response


def register_errorhandlers(app):

    def render_error(error):
        # If a HTTPException, pull the `code` attribute; default to 500
        error_code = getattr(error, 'code', 500)
        return render_template("error/{0}.html".format(error_code)), error_code

    for errcode in [401, 403, 404, 500]:
        # add more codes if we create templates for them
        app.errorhandler(errcode)(render_error)
    return None


def setup_user_audit(app):
    from application.audit.auditor import record_login, record_logout
    from flask_login import user_logged_in, user_logged_out

    user_logged_in.connect(record_login, app)
    user_logged_out.connect(record_logout, app)


# Temporary jiggery pokery
def redirect_for_research():
    from flask import request
    if request.path == '/auth/login' and request.args.get('next') == '/':
        return redirect(url_for('prototype.index'))


# More temporary jiggery pokery
# https://stackoverflow.com/questions/17135006/url-routing-conflicts-for-static-files-in-flask-dev-server
def get_the_favicon():
    from flask import request
    from flask import current_app
    from flask import send_from_directory
    if 'favicon.ico' in request.path:
        file = request.path.split('/')[-1]
        directory = '%s/%s' % (current_app.static_folder, 'images')
        return send_from_directory(directory, file)
