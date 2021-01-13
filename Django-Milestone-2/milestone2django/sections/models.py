from django.db import models
# Create your models here.

class Sections(models.Model):
    id          = models.IntegerField(primary_key=True);
    course_outline_id    = models.IntegerField(blank=True,null=True);
    location       = models.TextField(blank=True,null=True);
    name      = models.TextField(blank=True,null=True);
    days      = models.TextField(blank=True,null=True);
    time      = models.TextField(blank=True,null=True);
        