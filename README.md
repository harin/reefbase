
## What is `Reefbase`

**Reefbase** is a application for scuba divers to explore possible dive sites around the world. It utilizes data from [divesites.com](http://divesites.com) and water temperature data from [NOAA's World Ocean Atlas](https://www.nodc.noaa.gov/OC5/SELECT/woaselect/woaselect.html) dataset to display temperature and dive site around the world.

## Architecture
The `reefbase` application is seperated into 3 components, the database, the REST API and the client side application.

### Database
Here we use `postgresql` because it is the best supported database on `django` and it has a well supported `PostGIS` extension that allows us to use complex query on geographical data (GPS coordinates of dive sites).

### REST API
`Django` is used as the foundation of the REST API. It provides thought out organization of project that makes it easy to develop application.

### Frontend
`React` is used as the frontend. I try to keep it as simple as possible, as such, the major libraries apart of `react` that is being used here is `react-router`.

## Organization
Since this is a django project, the folders represent each component of the application.
The most notable ones are 
* divesites - which is a REST API for dive site information
* frontend - which is a wrapper around a React Client Side application
* reefbasedjango - the main folder of the project which pulls all the components together

WIP components 
* divelogs - a REST API for dive log information
* notes - a REST API for storing notes about individual dive sites

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
