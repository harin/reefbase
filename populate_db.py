from reefbase import db, create_app
from sqlalchemy.sql import text
import json

app = create_app()
db_session = db.session

with app.app_context():
    db_session.execute(
        'INSERT INTO country (id, name) VALUES (1, "Mexico")'
    )
    db_session.execute(
        'INSERT INTO country (id, name) VALUES (2, "Thailand")'
    )
    db_session.execute(
        f'INSERT INTO destination (id, name, country_id) VALUES (1, "Cozumel", 1)'
    )
    db_session.execute(
        f'INSERT INTO destination (id, name, country_id) VALUES (2, "Koh Tao", 2)'
    )
    db_session.commit()

    with open('./cozumel.json', 'r') as f:
        data = json.load(f)
        for site in data['sites']:
            db_session.execute(
                f"INSERT INTO divesite (name, destination_id, coord) VALUES ('{site['name']}', 1 , ST_GeomFromText('POINT({site['lat']} {site['lng']})', 4326))"
            )
        db_session.commit()

    with open('./koh-tao.json', 'r') as f:
        data = json.load(f)
        for site in data['sites']:
            db_session.execute(
                f"INSERT INTO divesite (name, destination_id, coord) VALUES ('{site['name']}', 2 , ST_GeomFromText('POINT({site['lat']} {site['lng']})', 4326))"
            )
        db_session.commit()        