from django.shortcuts import render
from rest_framework import viewsets    
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .serializers import Required_Textbooks_Serializer      
from .models import Required_Textbooks                          


@api_view(['GET', 'POST','DELETE'])
def Required_Textbooks_list(request):
    if request.method == 'GET':
        data = Required_Textbooks.objects.all()

        serializer = Required_Textbooks_Serializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = Required_Textbooks_Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        for i in range(99):
          try:
            Required_Textbook = Required_Textbooks.objects.get(pk=i)
            Required_Textbook.delete()
          except Required_Textbooks.DoesNotExist:
            pass
          
        data = Required_Textbooks.objects.all()
        serializer = Required_Textbooks_Serializer(data, context={'request': request}, many=True)
        return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
def Required_Textbooks_detail(request, pk):
    try:
        Required_Textbook = Required_Textbooks.objects.get(pk=pk)
    except Required_Textbooks.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = Required_Textbooks_Serializer(Required_Textbook, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        Required_Textbook.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'GET':
        serializer = Required_Textbooks_Serializer(Required_Textbook, context={'request': request}, many=False)

        return Response(serializer.data)


class Required_Textbooks_View(viewsets.ModelViewSet):      
  serializer_class = Required_Textbooks_Serializer          
  queryset = Required_Textbooks.objects.all()             