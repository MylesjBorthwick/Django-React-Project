from django.shortcuts import render
from rest_framework import viewsets    
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .serializers import Sections_Serializer      
from .models import Sections                          


@api_view(['GET', 'POST','DELETE'])
def Sections_list(request):
    if request.method == 'GET':
        data = Sections.objects.filter(id__lt=100)

        serializer = Sections_Serializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = Sections_Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        for i in range(99):
          try:
            Section = Sections.objects.get(pk=i)
            Section.delete()
          except Sections.DoesNotExist:
            pass
          
        data = Sections.objects.all()
        serializer = Sections_Serializer(data, context={'request': request}, many=True)
        return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
def Sections_detail(request, pk):
    try:
        Section = Sections.objects.get(pk=pk)
    except Sections.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = Sections_Serializer(Section, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        Section.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'GET':
        serializer = Sections_Serializer(Section, context={'request': request}, many=False)

        return Response(serializer.data)


class Sections_View(viewsets.ModelViewSet):       # add this
  serializer_class = Sections_Serializer          # add this
  queryset = Sections.objects.all()              # add this