from django.shortcuts import render
from rest_framework import viewsets    
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .serializers import Calculator_Use_Serializer      
from .models import Calculator_Use                          


@api_view(['GET', 'POST','DELETE'])
def Calculator_Use_list(request):
    if request.method == 'GET':
        data = Calculator_Use.objects.all()

        serializer = Calculator_Use_Serializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = Calculator_Use_Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        for i in range(99):
          try:
            Course_Objective = Calculator_Use.objects.get(pk=i)
            Course_Objective.delete()
          except Calculator_Use.DoesNotExist:
            pass
          
        data = Calculator_Use.objects.all()
        serializer = Calculator_Use_Serializer(data, context={'request': request}, many=True)
        return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
def Calculator_Use_detail(request, pk):
    try:
        Course_Objective = Calculator_Use.objects.get(pk=pk)
    except Calculator_Use.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = Calculator_Use_Serializer(Course_Objective, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        Course_Objective.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'GET':
        serializer = Calculator_Use_Serializer(Course_Objective, context={'request': request}, many=False)

        return Response(serializer.data)



class Calculator_Use_View(viewsets.ModelViewSet):      
  serializer_class = Calculator_Use_Serializer          
  queryset = Calculator_Use.objects.all()             