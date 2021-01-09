from django.shortcuts import render
from rest_framework import viewsets          
from .serializers import Examinations_Serializer      
from .models import Examinations                    


class Examinations_View(viewsets.ModelViewSet):      
  serializer_class = Examinations_Serializer          
  queryset = Examinations.objects.all()             