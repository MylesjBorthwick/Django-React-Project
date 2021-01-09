from django.db import models
# Create your models here.

class Sections(models.Model):
    section_id          = models.IntegerField();
    course_outline_id    = models.IntegerField();
    location       = models.TextField();
    name      = models.TextField();
    days      = models.TextField();
    time      = models.TextField();
    