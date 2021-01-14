from rest_framework import serializers
from .models import Instructors


class Instructors_Serializer(serializers.ModelSerializer):
  class Meta:
    model = Instructors
    fields = ('id', 'course_outline_id', 'section', 'fname', 'lname','phone','office','email')
    
