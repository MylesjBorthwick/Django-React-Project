from django.db import models

# Create your models here.

class Final_Grades(models.Model):
    id                      = models.IntegerField(primary_key=True);
    course_outline_id       = models.IntegerField(blank=True,null=True);
    learningOutcome         = models.TextField(blank=True,null=True);
    weight                  = models.TextField(blank=True,null=True);
    finalGrade              = models.TextField(blank=True,null=True);
    name                    = models.TextField(blank=True,null=True);
    
