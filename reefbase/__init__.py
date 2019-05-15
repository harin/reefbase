import os
from flask import Flask, render_template, jsonify, request, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from .webtoken import init_jwt
from .utils import render_query, execute, to_dicts

engine_options = {}
if os.environ.get('FLASK_ENV') == 'production':
    engine_options['connect_args'] = {
        'ssl': { 'ca' : os.environ.get('RDS_CA_PATH') }
    }

print('engine options', engine_options)
print('FLASK_ENV', os.environ['FLASK_ENV'])

db = SQLAlchemy(engine_options=engine_options)

def create_app(test_config=None):
    # create and configure the app
    static_folder = "frontend/build"
    app = Flask(__name__, instance_relative_config=True, static_folder='frontend/build/')
    db.init_app(app)
    init_jwt(app)

    if os.environ.get('FLASK_ENV') == 'development':
        app.config.from_object('config.DevelopmentConfig')
        from flask_cors import CORS
        CORS(app)
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
    from . import divesites
    app.register_blueprint(divesites.bp, url_prefix='/api/divesites')
    from . import site_notes
    app.register_blueprint(site_notes.bp, url_prefix='/api/notes')
    
# Serve React App
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve(path):
        if path != "" and os.path.exists(app.static_folder + path):
            print('serving', path)
            return send_from_directory(app.static_folder, path)
        else:
            print('serving', 'index.html', app.static_folder + path)
            return send_from_directory(app.static_folder, 'index.html')

    @app.route('/api/countries')
    def countries():
        return render_query(db.session,
            """
                SELECT id, name, ST_LATITUDE(coord) as lat, ST_LONGITUDE(coord) as lng, zoom_level FROM country
            """
        )

    @app.route('/api/destinations')
    def destinations():
        return render_query(db.session, """
                SELECT 
                    d.id, 
                    d.name, 
                    ST_LATITUDE(d.coord) as lat, 
                    ST_LONGITUDE(d.coord) as lng, 
                    d.zoom_level,
                    country.name as country
                FROM destination as d
                JOIN country ON d.country_id = country.id
            """)

    @app.route('/api/destinations/divesites/<country>/<dest_name>')
    def destination_with_sites(country, dest_name):
        dest = execute(db.session, f"SELECT id, name, ST_LATITUDE(coord) as lat, ST_LONGITUDE(coord) as lng, zoom_level  FROM destination WHERE name = '{dest_name}'")[0]
        sites = db.session.execute("""
            SELECT 
                divesite.id,
                divesite.name, 
                destination_id, 
                ST_Latitude(divesite.coord) as lat, 
                ST_Longitude(divesite.coord) as lng,
                destination.name as destination,
                country.name as country
            FROM destination 
            JOIN divesite ON divesite.destination_id = destination.id
            JOIN country ON destination.country_id = country.id
            WHERE destination.name = :dest
                AND country.name = :country
            """, { 'dest': dest_name, 'country': country })
        sites = to_dicts(sites)
        dest['divesites'] = sites
        return jsonify(dest)
    


    @app.route('/ping')
    def ping():
        return 'pong'

    print(app.url_map)



    return app