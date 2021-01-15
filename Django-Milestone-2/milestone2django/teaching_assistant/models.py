from django.db import models

# Create your models here.

class Teaching_Assistants(models.Model):
    id          = models.IntegerField(primary_key=True);
    course_outline_id       = models.IntegerField(blank=True,null=True);
    section                 = models.TextField(blank=True,null=True);
    fname                   = models.TextField(blank=True,null=True);
    lname                   = models.TextField(blank=True,null=True);
    phone                   = models.TextField(blank=True,null=True);
    office                  = models.TextField(blank=True,null=True);
    email                   = models.TextField(blank=True,null=True);
    
