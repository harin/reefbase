from reefbase import create_app, db


app = create_app()
with app.app_context():
    print(db.session.execute('select * from site').fetchone())