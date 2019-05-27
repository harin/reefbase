from django.core.management.base import BaseCommand
from divesites.models import Country, City, DiveSite
import pandas as pd
import json
import os
from pathlib import Path

class Command(BaseCommand):
    args = '<foo bar ...>'
    help = 'our help string comes here'

    def _create_countries(self):
        data = json.load(open((Path(__file__).parent)/'divesites.json'))
        df = pd.DataFrame(data)
        df.lng = df.lng.astype('float')
        df.lat = df.lat.astype('float')

        Country.objects.all().delete()
        City.objects.all().delete()
        DiveSite.objects.all().delete()

        for i, row in df.groupby('country').mean().reset_index().iterrows():
            c = Country(name=row['country'], lat=row['lat'], lng=row['lng'])
            c.save()

        for country_name in df.country.unique():
            df_ = df[df.country == country_name]
            country = Country.objects.filter(name = country_name).first()
            df_city = df_.groupby('city').mean().reset_index()
            for i, row in df_city.iterrows():
                d = City(
                    name=row.city, 
                    lat=row.lat, 
                    lng=row.lng, 
                    country=country)
                d.save()

        for city in df.city.unique():
            df_ = df[df.city == city]
            dest = City.objects.filter(name = city).first()
            for i, row in df_.iterrows():
                d = DiveSite(name=row['name'], lat=row.lat, lng=row.lng, city=dest)
                d.save()

    def handle(self, *args, **options):
        self._create_countries()