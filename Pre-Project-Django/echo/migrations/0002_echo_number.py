# Generated by Django 3.1.4 on 2020-12-11 10:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('echo', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='echo',
            name='number',
            field=models.BigIntegerField(default=0),
            preserve_default=False,
        ),
    ]
