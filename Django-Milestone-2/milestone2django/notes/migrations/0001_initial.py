# Generated by Django 3.1.4 on 2021-01-08 18:06

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Notes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('course_outline_id', models.IntegerField()),
                ('note', models.TextField()),
            ],
        ),
    ]
