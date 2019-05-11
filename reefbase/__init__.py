import os

from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy


engine_options = {}
if os.environ.get('FLASK_ENV') == 'production':
    engine_options['connect_args'] = {
        'ssl': { 'ca' : os.environ.get('RDS_CA_PATH') }
    }
db = SQLAlchemy(engine_options=engine_options)

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    # app.config.from_envvar('REEFBASE_SETTINGS')
    db.init_app(app)

    print('FLASK_ENV', os.environ['FLASK_ENV'])
    if os.environ['FLASK_ENV'] == 'production':
        app.config.from_object('config.ProductionConfig')
    else:
        app.config.from_object('config.DevelopmentConfig')

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # a simple page that says hello
    @app.route('/hello')
    def hello():
        return 'Hello, World!'


    from . import auth
    app.register_blueprint(auth.bp)
    from . import sites
    app.register_blueprint(sites.bp, url_prefix='/api/sites')
    from . import site_notes
    app.register_blueprint(site_notes.bp, url_prefix='/api/site-notes')
    # app.add_url_rule('/', endpoint='index')
    
    @app.route('/')
    def index():
        return render_template('index.html')

    print(app.url_map)

    return app