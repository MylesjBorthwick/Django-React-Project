from rest_framework import serializers
from .models import Master_Update


class Course_Objectives_Serializer(serializers.ModelSerializer):
  class Meta:
    model = Master_Update
    fields = ('course_outline_id', 'num', 'course_name')