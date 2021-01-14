from rest_framework import serializers
from .models import Graduate_Attributes


class Graduate_Attributes_Serializer(serializers.ModelSerializer):
  class Meta:
    model = Graduate_Attributes
    fields = ('id', 'course_outline_id', 'publicID', 'grad', 'instruct')
