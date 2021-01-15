from django.shortcuts import render
from rest_framework import viewsets    
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .serializers import Course_Coordinators_Serializer      
from .models import Course_Coordinators                          


@api_view(['GET', 'POST','DELETE'])
def Course_Coordinators_list(request):
    if request.method == 'GET':
        data = Course_Coordinators.objects.filter(id__lt=100)

        serializer = Course_Coordinators_Serializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = Course_Coordinators_Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        for i in range(99):
          try:
            Instructor = Course_Coordinators.objects.get(pk=i)
            Instructor.delete()
          except Course_Coordinators.DoesNotExist:
            pass
          
        data = Course_Coordinators.objects.all()
        serializer = Course_Coordinators_Serializer(data, context={'request': request}, many=True)
        return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
def Course_Coordinators_detail(request, pk):
    try:
        Instructor = Course_Coordinators.objects.get(pk=pk)
    except Course_Coordinators.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = Course_Coordinators_Serializer(Instructor, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        Instructor.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'GET':
        serializer = Course_Coordinators_Serializer(Instructor, context={'request': request}, many=False)

        return Response(serializer.data)
