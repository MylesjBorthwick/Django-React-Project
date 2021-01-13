from django.shortcuts import render
from rest_framework import viewsets    
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .serializers import Final_Grades_Serializer      
from .models import Final_Grades                          


@api_view(['GET', 'POST','DELETE'])
def Final_Grades_list(request):
    if request.method == 'GET':
        data = Final_Grades.objects.all()

        serializer = Final_Grades_Serializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = Final_Grades_Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        for i in range(99):
          try:
            Final_Grade = Final_Grades.objects.get(pk=i)
            Final_Grade.delete()
          except Final_Grades.DoesNotExist:
            pass
          
        data = Final_Grades.objects.all()
        serializer = Final_Grades_Serializer(data, context={'request': request}, many=True)
        return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
def Final_Grades_detail(request, pk):
    try:
        Final_Grade = Final_Grades.objects.get(pk=pk)
    except Final_Grades.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = Final_Grades_Serializer(Final_Grade, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        Final_Grade.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'GET':
        serializer = Final_Grades_Serializer(Final_Grade, context={'request': request}, many=False)

        return Response(serializer.data)






class Final_Grades_View(viewsets.ModelViewSet):      
  serializer_class = Final_Grades_Serializer          
  queryset = Final_Grades.objects.all()             