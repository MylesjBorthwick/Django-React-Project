from django.shortcuts import render
from rest_framework import viewsets    
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .serializers import Course_Objectives_Serializer      
from .models import Course_Objectives                          


@api_view(['GET', 'POST','DELETE'])
def Course_Objectives_list(request):
    if request.method == 'GET':
        data = Course_Objectives.objects.filter(id__lt=100)

        serializer = Course_Objectives_Serializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = Course_Objectives_Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        for i in range(99):
          try:
            Course_Objective = Course_Objectives.objects.get(pk=i)
            Course_Objective.delete()
          except Course_Objectives.DoesNotExist:
            pass
          
        data = Course_Objectives.objects.all()
        serializer = Course_Objectives_Serializer(data, context={'request': request}, many=True)
        return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
def Course_Objectives_detail(request, pk):
    try:
        Course_Objective = Course_Objectives.objects.get(pk=pk)
    except Course_Objectives.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = Course_Objectives_Serializer(Course_Objective, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        Course_Objective.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'GET':
        serializer = Course_Objectives_Serializer(Course_Objective, context={'request': request}, many=False)

        return Response(serializer.data)


class Course_Objectives_View(viewsets.ModelViewSet):      
  serializer_class = Course_Objectives_Serializer          
  queryset = Course_Objectives.objects.all()             