from django.db import models

# Create your models here.

class Course_Objectives(models.Model):
    id          = models.IntegerField(primary_key=True);
    course_outline_id    = models.IntegerField();
    publicID       = models.IntegerField();
    name      = models.TextField();
