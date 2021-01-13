from django.db import models

# Create your models here.

class Calculator_Use(models.Model):
    id          = models.IntegerField(primary_key=True);
    course_outline_id    = models.IntegerField(blank=True,null=True);
    rules       = models.TextField(blank=True,null=True);

    