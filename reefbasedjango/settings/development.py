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
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'reefbaseapp',
        'HOST': 'localhost',
        'USER': 'postgres',
        'PASSWORD': 'password'
    }
}