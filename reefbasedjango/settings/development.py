from reefbasedjango.settings.common import *


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '!$ce-yc*v4y5^_e#xyzqs3)=di1e9*gq1mad#08nx8s$qcc+lb'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        'NAME': 'reefbaseapp',
        'HOST': 'localhost',
        'USER': 'postgres',
        'PASSWORD': 'password'
    }
}

url_string = os.environ.get('DATABASE_URL')
if url_string:
    import dj_database_url
    DATABASES['default'] = dj_database_url.parse(url_string, conn_max_age=600, ssl_require=True)
    DATABASES['default']['ENGINE'] = 'django.contrib.gis.db.backends.postgis' 