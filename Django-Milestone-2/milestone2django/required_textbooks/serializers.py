from rest_framework import serializers
from .models import Required_Textbooks


class Required_Textbooks_Serializer(serializers.ModelSerializer):
  class Meta:
    model = Required_Textbooks
    fields = ('id','course_outline_id', 'title', 'author', 'edition','publisher')

