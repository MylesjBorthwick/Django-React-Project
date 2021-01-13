from django.db import models

# Create your models here.

class GPA_Conversions(models.Model):
    id          = models.IntegerField(primary_key=True);
    course_outline_id    = models.IntegerField(blank=True,null=True);
    lowerGrade       = models.TextField(blank=True,null=True);
    upperGrade      = models.TextField(blank=True,null=True);
    T_sign      = models.TextField(blank=True,null=True);
    name      = models.TextField(blank=True,null=True);

   