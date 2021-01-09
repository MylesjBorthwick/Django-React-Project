from django.db import models

# Create your models here.

class Final_Grades(models.Model):
    id          = models.IntegerField(primary_key=True);
    course_outline_id    = models.IntegerField();
    weight       = models.TextField();
    finalGrade      = models.TextField();
    name      = models.TextField();
    
