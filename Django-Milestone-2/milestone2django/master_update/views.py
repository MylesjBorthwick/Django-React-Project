from django.shortcuts import render
from rest_framework import viewsets    
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Master_Update                          


from recommended_textbooks import models as recommended_textbooks_models                           
from required_textbooks import models as required_textbooks_models                           
from sections import models as sections_models
from notes import models as notes_models
from instructors import models as instructors_models  
from gpa_conversions import models as gpa_conversions_models
from final_grades import models as final_grades_models
from examinations import models as examinations_models
from course_objectives import models as course_objectives_models
from calendar_information import models as calendar_information_models
from calculator_use import models as calculator_use_models


from policies import models as policies_models 

from graduate_attributes import models as graduate_attributes_models


import time

@api_view(['GET', 'DELETE'])
def Master_increase(request):
    if request.method == 'DELETE':
        data = policies_models.objects.filter(id<100)

        increase_num = time.gmtime()
        for datum in data:
            datum.id = datum.id + increase_num



        return Response(status=status.HTTP_204_NO_CONTENT)






    elif request.method == 'GET':
        return Response(status=status.HTTP_204_NO_CONTENT)

    #     serializer = Instructors_Serializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(status=status.HTTP_201_CREATED)
            
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # elif request.method == 'DELETE':
    #     for i in range(99):
    #       try:
    #         Instructor = Instructors.objects.get(pk=i)
    #         Instructor.delete()
    #       except Instructors.DoesNotExist:
    #         pass
          
    #     data = Instructors.objects.all()
    #     serializer = Instructors_Serializer(data, context={'request': request}, many=True)
    #     return Response(serializer.data)

