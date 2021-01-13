from django.shortcuts import render
from rest_framework import viewsets    
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .serializers import Course_Policies_Serializer      
from .models import Course_Policies                          


@api_view(['GET', 'POST','DELETE'])
def Course_Policies_list(request):
    if request.method == 'GET':
        data = Course_Policies.objects.all()

        serializer = Course_Policies_Serializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = Course_Policies_Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        for i in range(99):
          try:
            Course_Policie = Course_Policies.objects.get(pk=i)
            Course_Policie.delete()
          except Course_Policies.DoesNotExist:
            pass
          
        data = Course_Policies.objects.all()
        serializer = Course_Policies_Serializer(data, context={'request': request}, many=True)
        return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
def Course_Policies_detail(request, pk):
    try:
        Course_Policie = Course_Policies.objects.get(pk=pk)
    except Course_Policies.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = Course_Policies_Serializer(Course_Policie, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        Course_Policie.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'GET':
        serializer = Course_Policies_Serializer(Course_Policie, context={'request': request}, many=False)

        return Response(serializer.data)

class Course_Policies_View(viewsets.ModelViewSet):      
  serializer_class = Course_Policies_Serializer          
  queryset = Course_Policies.objects.all()             