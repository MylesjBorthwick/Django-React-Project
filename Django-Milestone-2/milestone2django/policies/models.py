from django.db import models

# Create your models here.

class Policies(models.Model):
    id          = models.IntegerField(primary_key=True);
    course_outline_id    = models.IntegerField(blank=True,null=True);
    notes      = models.TextField(blank=True,null=True);

    