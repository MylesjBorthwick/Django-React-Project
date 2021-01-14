from django.db import models

# Create your models here.
class Graduate_Attributes(models.Model):
    id          = models.IntegerField(primary_key=True);
    course_outline_id    = models.IntegerField(blank=True,null=True);
    publicID       = models.IntegerField(blank=True,null=True);
    grad      = models.TextField(blank=True,null=True);
    instruct      = models.TextField(blank=True,null=True);
    