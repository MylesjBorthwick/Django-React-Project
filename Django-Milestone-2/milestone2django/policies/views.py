from django.shortcuts import render
from rest_framework import viewsets    
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .serializers import Policies_Serializer      
from .models import Policies                          


@api_view(['GET', 'POST','DELETE'])
def Policies_list(request):
    if request.method == 'GET':
        data = Policies.objects.filter(id<100)

        serializer = Policies_Serializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = Policies_Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        for i in range(99):
          try:
            Policy = Policies.objects.get(pk=i)
            Policy.delete()
          except Policies.DoesNotExist:
            pass
          
        data = Policies.objects.all()
        serializer = Policies_Serializer(data, context={'request': request}, many=True)
        return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
def Policies_detail(request, pk):
    try:
        Policy = Policies.objects.get(pk=pk)
    except Policies.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = Policies_Serializer(Policy, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        Policy.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'GET':
        serializer = Policies_Serializer(Policy, context={'request': request}, many=False)

        return Response(serializer.data)



class Policies_View(viewsets.ModelViewSet):      
  serializer_class = Policies_Serializer          
  queryset = Policies.objects.all()             