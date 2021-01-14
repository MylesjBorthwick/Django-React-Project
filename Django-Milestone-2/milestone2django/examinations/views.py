from django.shortcuts import render
from rest_framework import viewsets    
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .serializers import Examinations_Serializer      
from .models import Examinations                          


@api_view(['GET', 'POST','DELETE'])
def Examinations_list(request):
    if request.method == 'GET':
        data = Examinations.objects.filter(id<100)

        serializer = Examinations_Serializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = Examinations_Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        for i in range(99):
          try:
            Examination = Examinations.objects.get(pk=i)
            Examination.delete()
          except Examinations.DoesNotExist:
            pass
          
        data = Examinations.objects.all()
        serializer = Examinations_Serializer(data, context={'request': request}, many=True)
        return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
def Examinations_detail(request, pk):
    try:
        Examination = Examinations.objects.get(pk=pk)
    except Examinations.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = Examinations_Serializer(Examination, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        Examination.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'GET':
        serializer = Examinations_Serializer(Examination, context={'request': request}, many=False)

        return Response(serializer.data)



class Examinations_View(viewsets.ModelViewSet):      
  serializer_class = Examinations_Serializer          
  queryset = Examinations.objects.all()             