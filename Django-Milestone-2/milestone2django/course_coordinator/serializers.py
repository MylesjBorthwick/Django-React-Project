from rest_framework import serializers
from .models import Course_Coordinators


class Course_Coordinators_Serializer(serializers.ModelSerializer):
  class Meta:
    model = Course_Coordinators
    fields = ('id', 'course_outline_id', 'section', 'fname', 'lname','phone','office','email')
    
