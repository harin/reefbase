# Generated by Django 2.2.1 on 2019-05-28 15:14

import django.contrib.gis.db.models.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('divesites', '0004_auto_20190527_1532'),
    ]

    operations = [
        migrations.AddField(
            model_name='city',
            name='coord',
            field=django.contrib.gis.db.models.fields.PointField(null=True, srid=4326),
        ),
        migrations.AddField(
            model_name='country',
            name='coord',
            field=django.contrib.gis.db.models.fields.PointField(null=True, srid=4326),
        ),
        migrations.AddField(
            model_name='divesite',
            name='coord',
            field=django.contrib.gis.db.models.fields.PointField(null=True, srid=4326),
        ),
        migrations.RunSQL(
            "UPDATE divesites_city SET coord = st_SetSrid(st_MakePoint(lng, lat), 4326);",
        ),
        migrations.RunSQL(
            "UPDATE divesites_country SET coord = st_SetSrid(st_MakePoint(lng, lat), 4326);"
        ),
        migrations.RunSQL(
            "UPDATE divesites_divesite SET coord = st_SetSrid(st_MakePoint(lng, lat), 4326);",
        )
    ]
