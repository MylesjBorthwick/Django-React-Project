from django.db import models

# Create your models here.

class Course_Objectives(models.Model):
    course_objectives_id          = models.IntegerField();
    course_outline_id    = models.IntegerField();
    publicID       = models.IntegerField();
    name      = models.TextField();
