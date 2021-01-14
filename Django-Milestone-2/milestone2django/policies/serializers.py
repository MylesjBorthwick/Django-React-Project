from rest_framework import serializers
from .models import Policies


class Policies_Serializer(serializers.ModelSerializer):
  class Meta:
    model = Policies
    fields = ('id','course_outline_id', 'notes')

