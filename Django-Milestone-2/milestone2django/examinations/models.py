from django.db import models

# Create your models here.

class Examinations(models.Model):
    examination_id          = models.IntegerField();
    course_outline_id    = models.IntegerField();
    publicID       = models.IntegerField();
    name      = models.TextField();

    

