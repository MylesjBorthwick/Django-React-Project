from django.db import models
# Create your models here.

class Sections(models.Model):
    id          = models.IntegerField(primary_key=True);
    course_outline_id    = models.IntegerField();
    location       = models.TextField();
    name      = models.TextField();
    days      = models.TextField();
    time      = models.TextField();
    