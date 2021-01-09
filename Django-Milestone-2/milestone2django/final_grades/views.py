from django.shortcuts import render
from rest_framework import viewsets          
from .serializers import Final_Grades_Serializer      
from .models import Final_Grades                    


class Final_Grades_View(viewsets.ModelViewSet):      
  serializer_class = Final_Grades_Serializer          
  queryset = Final_Grades.objects.all()             