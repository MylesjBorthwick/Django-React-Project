from rest_framework import serializers
from .models import Teaching_Assistants


class Teaching_Assistants_Serializer(serializers.ModelSerializer):
  class Meta:
    model = Teaching_Assistants
    fields = ('id', 'course_outline_id', 'section', 'fname', 'lname','phone','office','email')
    
