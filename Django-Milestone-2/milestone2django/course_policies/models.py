from django.db import models

# Create your models here.

class Course_Policies(models.Model):
    id          = models.IntegerField(primary_key=True);
    course_outline_id    = models.IntegerField();
    policy       = models.TextField();

    