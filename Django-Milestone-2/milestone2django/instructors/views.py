from django.shortcuts import render
from rest_framework import viewsets    
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .serializers import Instructors_Serializer      
from .models import Instructors                          


@api_view(['GET', 'POST','DELETE'])
def Instructors_list(request):
    if request.method == 'GET':
        data = Instructors.objects.filter(id<100)

        serializer = Instructors_Serializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = Instructors_Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        for i in range(99):
          try:
            Instructor = Instructors.objects.get(pk=i)
            Instructor.delete()
          except Instructors.DoesNotExist:
            pass
          
        data = Instructors.objects.all()
        serializer = Instructors_Serializer(data, context={'request': request}, many=True)
        return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
def Instructors_detail(request, pk):
    try:
        Instructor = Instructors.objects.get(pk=pk)
    except Instructors.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = Instructors_Serializer(Instructor, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        Instructor.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'GET':
        serializer = Instructors_Serializer(Instructor, context={'request': request}, many=False)

        return Response(serializer.data)





class Instructors_View(viewsets.ModelViewSet):       # add this
  serializer_class = Instructors_Serializer          # add this
  queryset = Instructors.objects.all()              # add this