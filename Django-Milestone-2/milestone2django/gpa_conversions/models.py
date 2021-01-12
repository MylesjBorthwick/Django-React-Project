from django.db import models

# Create your models here.

class GPA_Conversions(models.Model):
    id          = models.IntegerField(primary_key=True);
    course_outline_id    = models.IntegerField();
    lowerGrade       = models.TextField();
    upperGrade      = models.TextField();
    T_sign      = models.TextField();
    name      = models.TextField();

   