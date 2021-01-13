from rest_framework import serializers
from .models import Course_Policies


class Course_Policies_Serializer(serializers.ModelSerializer):
  class Meta:
    model = Course_Policies
    fields = ('id','policy')

