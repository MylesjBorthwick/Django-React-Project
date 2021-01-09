from django.db import models

# Create your models here.

class Calculator_Use(models.Model):
    course_outline_id    = models.IntegerField();
    rules       = models.TextField();

    