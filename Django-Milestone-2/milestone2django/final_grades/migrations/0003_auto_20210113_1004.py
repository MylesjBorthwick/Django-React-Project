# Generated by Django 3.1.4 on 2021-01-13 10:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('final_grades', '0002_auto_20210111_1806'),
    ]

    operations = [
        migrations.AlterField(
            model_name='final_grades',
            name='course_outline_id',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='final_grades',
            name='finalGrade',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='final_grades',
            name='name',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='final_grades',
            name='weight',
            field=models.TextField(blank=True, null=True),
        ),
    ]
