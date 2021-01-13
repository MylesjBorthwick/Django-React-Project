from rest_framework import serializers
from .models import Course_Objectives


class Course_Objectives_Serializer(serializers.ModelSerializer):
  class Meta:
    model = Course_Objectives
    fields = ('id', 'publicID', 'name')
