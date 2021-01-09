from django.shortcuts import render
from rest_framework import viewsets          # add this
from .serializers import Notes_Serializer      # add this
from .models import Notes                     # add this


class Notes_View(viewsets.ModelViewSet):       # add this
  serializer_class = Notes_Serializer          # add this
  queryset = Notes.objects.all()              # add this