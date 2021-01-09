from django.shortcuts import render
from rest_framework import viewsets          # add this
from .serializers import Instructors_Serializer      # add this
from .models import Instructors                     # add this


class Instructors_View(viewsets.ModelViewSet):       # add this
  serializer_class = Instructors_Serializer          # add this
  queryset = Instructors.objects.all()              # add this