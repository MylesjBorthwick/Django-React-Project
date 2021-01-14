from django.shortcuts import render
from rest_framework import viewsets    
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .serializers import Graduate_Attributes_Serializer      
from .models import Graduate_Attributes                          



@api_view(['GET', 'POST','DELETE'])
def Graduate_Attributes_list(request):
    if request.method == 'GET':
        data = Graduate_Attributes.objects.filter(id<100)

        serializer = Graduate_Attributes_Serializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = Graduate_Attributes_Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        for i in range(99):
          try:
            Graduate_Attribute = Graduate_Attributes.objects.get(pk=i)
            Graduate_Attribute.delete()
          except Graduate_Attributes.DoesNotExist:
            pass
          
        data = Graduate_Attributes.objects.all()
        serializer = Graduate_Attributes_Serializer(data, context={'request': request}, many=True)
        return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
def Graduate_Attributes_detail(request, pk):
    try:
        Graduate_Attribute = Graduate_Attributes.objects.get(pk=pk)
    except Graduate_Attributes.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = Graduate_Attributes_Serializer(Graduate_Attribute, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        Graduate_Attribute.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'GET':
        serializer = Graduate_Attributes_Serializer(Graduate_Attribute, context={'request': request}, many=False)

        return Response(serializer.data)



class Graduate_Attributes_View(viewsets.ModelViewSet):      
  serializer_class = Graduate_Attributes_Serializer          
  queryset = Graduate_Attributes.objects.all()             