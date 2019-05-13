import os

from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy

engine_options = {}
if os.environ.get('FLASK_ENV') == 'production':
    engine_options['connect_args'] = {
        'ssl': { 'ca' : os.environ.get('RDS_CA_PATH') }
    }

print('engine options', engine_options)
db = SQLAlchemy(engine_options=engine_options)

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    # app.config.from_envvar('REEFBASE_SETTINGS')
    db.init_app(app)

    print('FLASK_ENV', os.environ['FLASK_ENV'])
    if os.environ.get('FLASK_ENV') == 'development':
        app.config.from_object('config.DevelopmentConfig')
    else:
        app.config.from_object('config.ProductionConfig')
        

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


    from . import auth
    app.register_blueprint(auth.bp)
    from . import sites
    app.register_blueprint(sites.bp, url_prefix='/api/sites')
    from . import site_notes
    app.register_blueprint(site_notes.bp, url_prefix='/api/site-notes')
    
    @app.route('/')
    def index():
        return render_template('index.html')

    @app.route('/ping')
    def ping():
        return 'pong'

    @app.after_request
    def after_request(response):
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response

    print(app.url_map)



    return app