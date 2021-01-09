from django.shortcuts import render
from rest_framework import viewsets          
from .serializers import Calculator_Use_Serializer      
from .models import Calculator_Use                    


class Calculator_Use_View(viewsets.ModelViewSet):      
  serializer_class = Calculator_Use_Serializer          
  queryset = Calculator_Use.objects.all()             