# Generated by Django 2.2.1 on 2019-05-17 03:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('notes', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='note',
            old_name='dive_site',
            new_name='divesite',
        ),
    ]
