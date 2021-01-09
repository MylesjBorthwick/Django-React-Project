from django.shortcuts import render
from rest_framework import viewsets         
from .serializers import GPA_Conversions_Serializer      
from .models import GPA_Conversions                     


class GPA_Conversions_View(viewsets.ModelViewSet):       
  serializer_class = GPA_Conversions_Serializer        
  queryset = GPA_Conversions.objects.all()            