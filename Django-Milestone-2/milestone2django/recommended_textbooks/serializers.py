from rest_framework import serializers
from .models import Recommended_Textbooks


class Recommended_Textbooks_Serializer(serializers.ModelSerializer):
  class Meta:
    model = Recommended_Textbooks
    fields = ('id','course_outline_id', 'title', 'author', 'edition','publisher')

