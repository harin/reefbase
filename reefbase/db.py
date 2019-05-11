from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from flask.cli import with_appcontext
from flask import current_app
import click 

# # default
# engine = create_engine('mysql://scott:tiger@localhost/foo')

# # mysqlclient (a maintained fork of MySQL-Python)
# engine = create_engine('mysql+mysqldb://scott:tiger@localhost/foo')

# # PyMySQL
# engine = create_engine('mysql+pymysql://scott:tiger@localhost/foo')

# engine = create_engine(current_app.config['DATABASE'], convert_unicode=True)
engine = create_engine('mysql+pymysql://root:achtung@localhost:3306/test_reefbase', convert_unicode=True)
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))
# Base = declarative_base()
# Base.query = db_session.query_property()

# from sqlalchemy import Column, Integer, String
def get_db():
    return db_session

def close_db(e=None):
    db_session.remove()

def init_db():
    db = get_db()

    # with current_app.open_resource('schema.sql') as f:
    #     db.executescript(f.read().decode('utf8'))

@click.command('init-db')
@with_appcontext
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()
    click.echo('Initialized the database.')


def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)

# def init_db():
#     # import all modules here that might define models so that
#     # they will be registered properly on the metadata.  Otherwise
#     # you will have to import them first before calling init_db()

#     # import reefbase.models
#     Base.metadata.create_all(bind=engine)

# class User(Base):
#     __tablename__ = 'users'
#     id = Column(Integer, primary_key=True)
#     name = Column(String(50), unique=True)
#     email = Column(String(120), unique=True)

#     def __init__(self, name=None, email=None):
#         self.name = name
#         self.email = email

#     def __repr__(self):
#         return '<User %r>' % (self.name)

# class Location(Base):
#     id = Column(Integer, primary_key=True)
#     name = Column(String(50))
#     parent = Column(Integer)

# class Site(Base):
#     id = Column(Integer, primary_key=True)
#     name = Column(String(50))
#     location_id = Column(Integer)
#     coord = Column()