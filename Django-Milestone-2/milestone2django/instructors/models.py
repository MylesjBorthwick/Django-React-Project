from django.db import models

# Create your models here.

class Instructors(models.Model):
    id          = models.IntegerField(primary_key=True);
    course_outline_id       = models.IntegerField();
    section                 = models.TextField();
    fname                   = models.TextField();
    lname                   = models.TextField();
    phone                   = models.TextField();
    office                  = models.TextField();
    email                   = models.TextField();
    
