from django.db import models

# Create your models here.

class Calendar_Information(models.Model):
    id          = models.IntegerField(primary_key=True);
    course_outline_id    = models.IntegerField(blank=True,null=True);
    num    = models.TextField(blank=True,null=True);
    course_name       = models.TextField(blank=True,null=True);
    description      = models.TextField(blank=True,null=True);
    hours      = models.TextField(blank=True,null=True);
    credit      = models.TextField(blank=True,null=True);
    link      = models.TextField(blank=True,null=True);
    
