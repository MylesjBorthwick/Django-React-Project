from django.db import models

# Create your models here.

class Required_Textbooks(models.Model):
    id          = models.IntegerField(primary_key=True);
    course_outline_id    = models.IntegerField(blank=True,null=True);
    title       = models.TextField(blank=True,null=True);
    author      = models.TextField(blank=True,null=True);
    edition      = models.TextField(blank=True,null=True);
    publisher      = models.TextField(blank=True,null=True);
    