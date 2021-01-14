from django.shortcuts import render
from rest_framework import viewsets    
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .serializers import GPA_Conversions_Serializer      
from .models import GPA_Conversions                          


@api_view(['GET', 'POST','DELETE'])
def GPA_Conversions_list(request):
    if request.method == 'GET':
        data = GPA_Conversions.objects.filter(id<100)

        serializer = GPA_Conversions_Serializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = GPA_Conversions_Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        for i in range(99):
          try:
            GPA_Conversion = GPA_Conversions.objects.get(pk=i)
            GPA_Conversion.delete()
          except GPA_Conversions.DoesNotExist:
            pass
          
        data = GPA_Conversions.objects.all()
        serializer = GPA_Conversions_Serializer(data, context={'request': request}, many=True)
        return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
def GPA_Conversions_detail(request, pk):
    try:
        GPA_Conversion = GPA_Conversions.objects.get(pk=pk)
    except GPA_Conversions.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = GPA_Conversions_Serializer(GPA_Conversion, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        GPA_Conversion.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'GET':
        serializer = GPA_Conversions_Serializer(GPA_Conversion, context={'request': request}, many=False)

        return Response(serializer.data)




class GPA_Conversions_View(viewsets.ModelViewSet):       
  serializer_class = GPA_Conversions_Serializer        
  queryset = GPA_Conversions.objects.all()       