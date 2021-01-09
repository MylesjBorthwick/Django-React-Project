from django.shortcuts import render
from rest_framework import viewsets          # add this
from .serializers import Recommended_Textbooks_Serializer      # add this
from .models import Recommended_Textbooks                     # add this


class Recommended_Textbooks_View(viewsets.ModelViewSet):       # add this
  serializer_class = Recommended_Textbooks_Serializer          # add this
  queryset = Recommended_Textbooks.objects.all()              # add this