from reefbase import db, create_app
from sqlalchemy.sql import text
import json

app = create_app()
db_session = db.session

with app.app_context():
    db_session.execute(
        'INSERT INTO country (id, name, coord, zoom_level) VALUES (1, "Mexico", ST_GeomFromText(\'POINT(23.3142857 -111.6402526)\', 4326), 5)'
    )
    db_session.execute(
        'INSERT INTO country (id, name, coord, zoom_level) VALUES (2, "Thailand", ST_GeomFromText(\'POINT(13.0110666 96.9946093)\', 4326), 6)'
    )
    db_session.execute(
        f'INSERT INTO destination (id, name, coord, country_id) VALUES (1, "Cozumel", ST_GeomFromText(\'POINT(20.4323493 -87.0143379)\', 4326),  1)'
    )
    db_session.execute(
        f'INSERT INTO destination (id, name, coord, country_id) VALUES (2, "Koh Tao",ST_GeomFromText(\'POINT(10.0923203 99.8178946)\', 4326), 2)'
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