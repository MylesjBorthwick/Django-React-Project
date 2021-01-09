from django.db import models

# Create your models here.

class Required_Textbooks(models.Model):
    textbook_id          = models.IntegerField();
    course_outline_id    = models.IntegerField();
    title       = models.TextField();
    author      = models.TextField();
    edition      = models.TextField();
    publisher      = models.TextField();
    