# Generated by Django 2.2.1 on 2019-05-28 16:45

import django.contrib.gis.db.models.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('divesites', '0005_auto_20190528_1514'),
    ]

    operations = [
        migrations.AlterField(
            model_name='city',
            name='coord',
            field=django.contrib.gis.db.models.fields.PointField(srid=4326),
        ),
        migrations.AlterField(
            model_name='country',
            name='coord',
            field=django.contrib.gis.db.models.fields.PointField(srid=4326),
        ),
        migrations.AlterField(
            model_name='divesite',
            name='coord',
            field=django.contrib.gis.db.models.fields.PointField(srid=4326),
        ),
    ]
