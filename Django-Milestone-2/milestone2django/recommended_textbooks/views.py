from django.shortcuts import render
from rest_framework import viewsets    
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .serializers import Recommended_Textbooks_Serializer      
from .models import Recommended_Textbooks                          


@api_view(['GET', 'POST','DELETE'])
def Recommended_Textbooks_list(request):
    if request.method == 'GET':
        data = Recommended_Textbooks.objects.filter(id__lt=100)

        serializer = Recommended_Textbooks_Serializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = Recommended_Textbooks_Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        for i in range(99):
          try:
            Recommended_Textbook = Recommended_Textbooks.objects.get(pk=i)
            Recommended_Textbook.delete()
          except Recommended_Textbooks.DoesNotExist:
            pass
          
        data = Recommended_Textbooks.objects.all()
        serializer = Recommended_Textbooks_Serializer(data, context={'request': request}, many=True)
        return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
def Recommended_Textbooks_detail(request, pk):
    try:
        Recommended_Textbook = Recommended_Textbooks.objects.get(pk=pk)
    except Recommended_Textbooks.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = Recommended_Textbooks_Serializer(Recommended_Textbook, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        Recommended_Textbook.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'GET':
        serializer = Recommended_Textbooks_Serializer(Recommended_Textbook, context={'request': request}, many=False)

        return Response(serializer.data)

class Recommended_Textbooks_View(viewsets.ModelViewSet):      
  serializer_class = Recommended_Textbooks_Serializer          
  queryset = Recommended_Textbooks.objects.all()              