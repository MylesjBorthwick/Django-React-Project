from rest_framework import serializers
from .models import Examinations


class Examinations_Serializer(serializers.ModelSerializer):
  class Meta:
    model = Examinations
    fields = ('id','course_outline_id', 'publicID', 'name')

