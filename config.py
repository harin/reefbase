import os

class Config(object):
    DEBUG = False
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = True

class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI')
    SECRET_KEY = os.environ.get('SECRET_KEY')
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')

class DevelopmentConfig(Config):
    SECRET_KEY = 'dev'
    JWT_SECRET_KEY = 'something'
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:password@localhost:3306/test_reefbase'

class TestingConfig(Config):
    TESTING = True