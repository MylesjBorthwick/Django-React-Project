from rest_framework import serializers
from .models import Notes


class Notes_Serializer(serializers.ModelSerializer):
  class Meta:
    model = Notes
    fields = ('id','note')

