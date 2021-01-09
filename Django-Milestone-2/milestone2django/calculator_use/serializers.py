from rest_framework import serializers
from .models import Calculator_Use


class Calculator_Use_Serializer(serializers.ModelSerializer):
  class Meta:
    model = Calculator_Use
    fields = ('id','rules')
