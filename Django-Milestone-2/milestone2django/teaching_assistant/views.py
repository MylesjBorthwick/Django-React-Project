from django.shortcuts import render
from rest_framework import viewsets    
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .serializers import Teaching_Assistants_Serializer      
from .models import Teaching_Assistants                          
from master_update import views as master_views


@api_view(['GET', 'POST','DELETE'])
def Teaching_Assistants_list(request):
    if request.method == 'GET':
        data = Teaching_Assistants.objects.filter(id__lt=master_views.master_course_number+100).filter(id__gte=master_views.master_course_number)

        serializer = Teaching_Assistants_Serializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = Teaching_Assistants_Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        for i in range(99):
          try:
            Instructor = Teaching_Assistants.objects.get(pk=i)
            Instructor.delete()
          except Teaching_Assistants.DoesNotExist:
            pass
          
        data = Teaching_Assistants.objects.all()
        serializer = Teaching_Assistants_Serializer(data, context={'request': request}, many=True)
        return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
def Teaching_Assistants_detail(request, pk):
    try:
        Instructor = Teaching_Assistants.objects.get(pk=pk)
    except Teaching_Assistants.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = Teaching_Assistants_Serializer(Instructor, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        Instructor.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'GET':
        serializer = Teaching_Assistants_Serializer(Instructor, context={'request': request}, many=False)

        return Response(serializer.data)



