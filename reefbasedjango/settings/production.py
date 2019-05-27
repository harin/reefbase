from reefbasedjango.settings.common import *

DEBUG = os.environ.get('DEBUG', False)

SECRET_KEY = os.environ['SECRET_KEY']

# SECURITY WARNING: update this when you have the production host
ALLOWED_HOSTS = ['reefbase.herokuapp.com']

# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases


root_ca_path = BASE_DIR.parent/'amazon-rds-cs-cert.pem'
print('root_ca_path', root_ca_path)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ['DATABASE_NAME'],
        'HOST': os.environ['DATABASE_HOST'] ,
        'USER': os.environ['DATABASE_USER'],
        'PASSWORD': os.environ['DATABASE_PASSWORD'],
        'OPTIONS': { 
            'sslmode': 'require',
            'sslrootcert': root_ca_path
        }
    }
}
