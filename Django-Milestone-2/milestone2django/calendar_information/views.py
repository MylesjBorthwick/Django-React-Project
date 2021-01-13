from django.shortcuts import render
from rest_framework import viewsets    
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .serializers import Calendar_Information_Serializer      
from .models import Calendar_Information                          


@api_view(['GET', 'POST','DELETE'])
def Calendar_Information_list(request):
    if request.method == 'GET':
        data = Calendar_Information.objects.all()

        serializer = Calendar_Information_Serializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = Calendar_Information_Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        for i in range(99):
          try:
            Course_Objective = Calendar_Information.objects.get(pk=i)
            Course_Objective.delete()
          except Calendar_Information.DoesNotExist:
            pass
          
        data = Calendar_Information.objects.all()
        serializer = Calendar_Information_Serializer(data, context={'request': request}, many=True)
        return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
def Calendar_Information_detail(request, pk):
    try:
        Course_Objective = Calendar_Information.objects.get(pk=pk)
    except Calendar_Information.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = Calendar_Information_Serializer(Course_Objective, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        Course_Objective.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'GET':
        serializer = Calendar_Information_Serializer(Course_Objective, context={'request': request}, many=False)

        return Response(serializer.data)


class Calendar_Information_View(viewsets.ModelViewSet):      
  serializer_class = Calendar_Information_Serializer          
  queryset = Calendar_Information.objects.all()             