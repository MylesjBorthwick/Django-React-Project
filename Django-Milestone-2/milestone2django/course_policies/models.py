from django.db import models

# Create your models here.

class Course_Policies(models.Model):
    course_outline_id    = models.IntegerField();
    policy       = models.TextField();

    