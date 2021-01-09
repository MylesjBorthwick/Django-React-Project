from django.db import models

# Create your models here.

class Notes(models.Model):
    course_outline_id    = models.IntegerField();
    note       = models.TextField();

    