# Generated by Django 2.2.1 on 2019-05-27 15:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('divesites', '0003_auto_20190527_0231'),
    ]

    operations = [
        migrations.RenameField(
            model_name='divesite',
            old_name='destination',
            new_name='city',
        ),
    ]