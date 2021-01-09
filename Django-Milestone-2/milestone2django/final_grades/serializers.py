from rest_framework import serializers
from .models import Final_Grades


class Final_Grades_Serializer(serializers.ModelSerializer):
  class Meta:
    model = Final_Grades
    fields = ('final_grades_id', 'weight', 'finalGrade', 'name')

