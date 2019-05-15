from reefbase import db, create_app
from sqlalchemy.sql import text
import pandas as pd
import json
from reefbase.utils import to_dicts

app = create_app()
db_session = db.session

with app.app_context():
    data = json.load(open('data_merge.json'))
    df = pd.DataFrame(data) 
    df.lat = df.lat.astype('float')
    df.lng = df.lng.astype('float')
    countries = df.country.unique()

    rows = []
    for i, row in df.groupby('country').mean().reset_index().iterrows():
        rows.append(f"""("{row.country}", ST_GeomFromText('POINT({row.lat} {row.lng})',4326))""")
    country_sql = 'INSERT INTO country (name, coord) VALUES ' + ','.join(rows)

    db.session.execute(country_sql)
    db.session.commit()

    result = db.session.execute('select id, name from country').fetchall()
    country_id_map = {}

    for row in to_dicts(result):
        country_id_map[row['name']] = row['id']

    rows = []
    for country in df.country.unique():
        df_ = df[df.country == country]
        df_city = df_.groupby('city').mean().reset_index()
        for i, row in df_city.iterrows():
            rows.append(f"""("{country_id_map[country]}","{row.city}",  ST_GeomFromText('POINT({row.lat} {row.lng})',4326))""")
    city_sql = 'INSERT INTO destination (country_id, name, coord) VALUES ' + ','.join(rows)
    
    db.session.execute(city_sql)
    db.session.commit()

    result = db.session.execute('select id, name from destination').fetchall()
    city_id_map = {}

    for row in to_dicts(result):
        city_id_map[row['name']] = row['id']

    rows = []
    for city in df.city.unique():
        df_ = df[df.city == city]
        for i, row in df_.iterrows():
            db.session.execute(
                "INSERT INTO divesite (destination_id, name, coord) VALUES (:destination_id, :name,  ST_GeomFromText('POINT(:lat :lng)',4326))",
                { 
                    'destination_id': city_id_map[city],
                    'name': row['name'],
                    'lat': row['lat'],
                    'lng': row['lng']
                }
            )

    db.session.commit()