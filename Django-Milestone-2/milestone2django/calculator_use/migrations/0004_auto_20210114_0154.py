# Generated by Django 3.1.4 on 2021-01-14 01:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('calculator_use', '0003_auto_20210113_1004'),
    ]

    operations = [
        migrations.AlterField(
            model_name='calculator_use',
            name='notes',
            field=models.TextField(blank=True, null=True),
        ),
    ]
