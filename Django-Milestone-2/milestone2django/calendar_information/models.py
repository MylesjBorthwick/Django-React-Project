from django.db import models

# Create your models here.

class Calendar_Information(models.Model):
    course_outline_id    = models.IntegerField();
    course_name       = models.TextField();
    description      = models.TextField();
    hours      = models.TextField();
    credit      = models.TextField();
    calendar      = models.TextField();
    
