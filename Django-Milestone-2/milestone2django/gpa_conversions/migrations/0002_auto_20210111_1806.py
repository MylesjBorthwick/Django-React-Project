# Generated by Django 3.1.4 on 2021-01-11 18:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gpa_conversions', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gpa_conversions',
            name='id',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
    ]
