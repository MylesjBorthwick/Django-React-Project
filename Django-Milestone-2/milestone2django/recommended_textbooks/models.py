from django.db import models

# Create your models here.

class Recommended_Textbooks(models.Model):
    id          = models.IntegerField(primary_key=True);
    course_outline_id    = models.IntegerField();
    title       = models.TextField();
    author      = models.TextField();
    edition      = models.TextField();
    publisher      = models.TextField();
    