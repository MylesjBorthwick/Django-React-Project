from django.shortcuts import render
from rest_framework import viewsets          # add this
from .serializers import Sections_Serializer      # add this
from .models import Sections                     # add this


class Sections_View(viewsets.ModelViewSet):       # add this
  serializer_class = Sections_Serializer          # add this
  queryset = Sections.objects.all()              # add this