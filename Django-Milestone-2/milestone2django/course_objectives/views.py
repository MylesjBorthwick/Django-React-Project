from django.shortcuts import render
from rest_framework import viewsets          
from .serializers import Course_Objectives_Serializer      
from .models import Course_Objectives                    


class Course_Objectives_View(viewsets.ModelViewSet):      
  serializer_class = Course_Objectives_Serializer          
  queryset = Course_Objectives.objects.all()             