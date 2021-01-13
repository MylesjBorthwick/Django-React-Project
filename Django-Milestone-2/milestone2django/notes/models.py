from django.db import models

# Create your models here.

class Notes(models.Model):
    id          = models.IntegerField(primary_key=True);
    course_outline_id    = models.IntegerField(blank=True,null=True);
    note       = models.TextField(blank=True,null=True);

    