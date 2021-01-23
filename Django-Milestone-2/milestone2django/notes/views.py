from django.shortcuts import render
from rest_framework import viewsets    
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .serializers import Notes_Serializer      
from .models import Notes                          
from master_update import views as master_views


@api_view(['GET', 'POST','DELETE'])
def Notes_list(request):
    if request.method == 'GET':
        data = Notes.objects.filter(id__lt=master_views.master_course_number+100).filter(id__gte=master_views.master_course_number)

        serializer = Notes_Serializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = Notes_Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        for i in range(99):
          try:
            Note = Notes.objects.get(pk=i)
            Note.delete()
          except Notes.DoesNotExist:
            pass
          
        data = Notes.objects.all()
        serializer = Notes_Serializer(data, context={'request': request}, many=True)
        return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
def Notes_detail(request, pk):
    try:
        Note = Notes.objects.get(pk=pk)
    except Notes.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = Notes_Serializer(Note, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        Note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'GET':
        serializer = Notes_Serializer(Note, context={'request': request}, many=False)

        return Response(serializer.data)




        
class Notes_View(viewsets.ModelViewSet):       # add this
  serializer_class = Notes_Serializer          # add this
  queryset = Notes.objects.all()              # add this