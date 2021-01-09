from django.db import models

# Create your models here.

class Final_Grades(models.Model):
    final_grades_id          = models.IntegerField();
    course_outline_id    = models.IntegerField();
    weight       = models.TextField();
    finalGrade      = models.TextField();
    name      = models.TextField();
    
