from django.shortcuts import render
from rest_framework import viewsets          
from .serializers import Calendar_Information_Serializer      
from .models import Calendar_Information                    


class Calendar_Information_View(viewsets.ModelViewSet):      
  serializer_class = Calendar_Information_Serializer          
  queryset = Calendar_Information.objects.all()             