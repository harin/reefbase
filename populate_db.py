from reefbase import db, create_app
from sqlalchemy.sql import text
import json

app = create_app()
db_session = db.session

with app.app_context():

    with open('./sites.json', 'r') as f:

        db_session.execute(
            'INSERT INTO location (name, parent) VALUES ("mexico", NULL)'
        )
        db_session.commit()

        result = db_session.execute('SELECT `id` from location where name = \'mexico\'').fetchone()

        db_session.execute(
            f'INSERT INTO location (name, parent) VALUES ("cozumel", {result[0]})'
        )
        db_session.commit()

        result = db_session.execute('SELECT `id` from location where name=\'cozumel\'').fetchone()

        data = json.load(f)
        for site in data['sites']:
            db_session.execute(
                f"INSERT INTO site (name, location_id, coord) VALUES ('{site['name']}',{result[0]}, ST_GeomFromText('POINT({site['lat']} {site['lng']})', 4326))"
            )
            db_session.commit()
            