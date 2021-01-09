from django.shortcuts import render
from rest_framework import viewsets          
from .serializers import Required_Textbooks_Serializer      
from .models import Required_Textbooks                    


class Required_Textbooks_View(viewsets.ModelViewSet):      
  serializer_class = Required_Textbooks_Serializer          
  queryset = Required_Textbooks.objects.all()             