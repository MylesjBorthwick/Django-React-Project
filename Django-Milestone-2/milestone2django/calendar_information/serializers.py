from rest_framework import serializers
from .models import Calendar_Information


class Calendar_Information_Serializer(serializers.ModelSerializer):
  class Meta:
    model = Calendar_Information
    fields = ('course_name', 'description', 'hours', 'credit','calendar')
    
