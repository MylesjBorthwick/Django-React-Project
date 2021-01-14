from rest_framework import serializers
from .models import Sections


class Sections_Serializer(serializers.ModelSerializer):
  class Meta:
    model = Sections
    fields = ('id','course_outline_id', 'location', 'name', 'days','time')

