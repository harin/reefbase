from django.core.management.base import BaseCommand
from divesites.models import Country, City, DiveSite
import pandas as pd
import json
import os
from pathlib import Path
import csv

class Command(BaseCommand):
    args = '<foo bar ...>'
    help = 'our help string comes here'

    def handle(self, *args, **options):
        path = Path(__file__).parent/'tempdata.csv'
        with open(path) as f:
            data = csv.reader(f)
            headers = []
            for i, row in enumerate(data):
                if i == 0:
                    headers = row
                else:
                    data_dict = {}
                    for j, value in enumerate(row):
                        data_dict[headers[j]] = value
                    d = DiveSite.objects.get(pk=data_dict['id'])
                    for key in headers:
                        setattr(d, key, data_dict[key])
                    print('Saving', d)
                    d.save()