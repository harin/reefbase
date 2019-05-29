

## Backend

### Installation

```
pipenv install
```

### setup database

```
python manage.py makemigrations
python manage.py migrate
python manage.py populate_db

python manage.py createsuperuser --email admin@example.com --username admin
```

To setup database in production, set the 

```
DJANGO_SETTINGS_MODULE=reefbasedjango.settings.production <run command>
```

### Running

```
python manage.py runserver
```

## Frontend

###

```
cd frontend
npm install
npm start
```
