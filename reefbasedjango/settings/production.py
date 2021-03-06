from reefbasedjango.settings.common import *
import dj_database_url


DEBUG = os.environ.get('DEBUG', 'False') == 'True'

SECRET_KEY = os.environ['SECRET_KEY']

# SECURITY WARNING: update this when you have the production host
ALLOWED_HOSTS = ['127.0.0.1', 'reefbase.herokuapp.com']

# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

# Setting for AWS RDS
# root_ca_path = BASE_DIR/'amazon-rds-ca-cert.pem'
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.contrib.gis.db.backends.postgis',
#         'NAME': os.environ['DATABASE_NAME'],
#         'HOST': os.environ['DATABASE_HOST'] ,
#         'USER': os.environ['DATABASE_USER'],
#         'PASSWORD': os.environ['DATABASE_PASSWORD'],
#         'OPTIONS': {
#             'sslmode': 'verify-full',
#             'sslrootcert': root_ca_path
#         }
#     }
# }


DATABASES = {}

url_string = os.environ.get('HEROKU_POSTGRESQL_GOLD_URL')
DATABASES['default'] = dj_database_url.parse(url_string, conn_max_age=600, ssl_require=True)
DATABASES['default']['ENGINE'] = 'django.contrib.gis.db.backends.postgis' 

# LOGGING = {
# 	'version': 1,
# 	'disable_existing_loggers': False,
# 	'filters': {
# 		'require_debug_false': {
# 			'()': 'django.utils.log.RequireDebugFalse',
# 		},
# 		'require_debug_true': {
# 			'()': 'django.utils.log.RequireDebugTrue',
# 		},
# 	},
# 	'formatters': {
# 		'django.server': {
# 			'()': 'django.utils.log.ServerFormatter',
# 			'format': '[%(server_time)s] %(message)s',
# 		}
# 	},
# 	'handlers': {
# 		'console': {
# 			'level': 'INFO',
# 			'filters': ['require_debug_true'],
# 			'class': 'logging.StreamHandler',
# 		},
# 		'console_debug_false': {
# 			'level': 'ERROR',
# 			'filters': ['require_debug_false'],
# 			'class': 'logging.StreamHandler',
# 		},
# 		'django.server': {
# 			'level': 'INFO',
# 			'class': 'logging.StreamHandler',
# 			'formatter': 'django.server',
# 		},
# 		'mail_admins': {
# 			'level': 'ERROR',
# 			'filters': ['require_debug_false'],
# 			'class': 'django.utils.log.AdminEmailHandler'
# 		}
# 	},
# 	'loggers': {
# 		'django': {
# 			'handlers': ['console', 'console_debug_false', 'mail_admins'],
# 			'level': 'INFO',
# 		},
# 		'django.server': {
# 			'handlers': ['django.server'],
# 			'level': 'INFO',
# 			'propagate': False,
# 		}
# 	}
# }
