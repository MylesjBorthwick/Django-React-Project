from django.shortcuts import render
from rest_framework import viewsets          
from .serializers import Course_Policies_Serializer      
from .models import Course_Policies                    


class Course_Policies_View(viewsets.ModelViewSet):      
  serializer_class = Course_Policies_Serializer          
  queryset = Course_Policies.objects.all()             