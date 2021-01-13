from rest_framework import serializers
from .models import Recommended_Textbooks


class Recommended_Textbooks_Serializer(serializers.ModelSerializer):
  class Meta:
    model = Recommended_Textbooks
    fields = ('id', 'title', 'author', 'edition','publisher')

