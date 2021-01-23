from django.db import models

# Create your models here.

class Master_Update(models.Model):
    course_outline_id    = models.IntegerField(blank=True,null=True);
    num    = models.TextField(blank=True,null=True);
    course_name       = models.TextField(blank=True,null=True);

    