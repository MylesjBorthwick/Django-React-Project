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
from teaching_assistant import models as teaching_assistants_models  
from course_coordinator import models as course_coordinators_models
from policies import models as policies_models 
from graduate_attributes import models as graduate_attributes_models

from datetime import datetime


import time

@api_view(['GET', 'DELETE'])
def Master_increase(request):
    if request.method == 'DELETE':
        now_str = str(datetime.now())
        now_str= now_str.replace('-','').replace(' ','').replace(':','').replace('.','')
        increase_num = (int(int(now_str)/1000)-20000000000000000)*100
        
        
        data = policies_models.Policies.objects.filter(id__lt=100)
        for datum in data:
            datum.id = datum.id + increase_num
            datum.course_outline_id = increase_num
            datum.save()
        data = policies_models.Policies.objects.filter(id__lt=100)
        data.delete()

        data = recommended_textbooks_models.Recommended_Textbooks.objects.filter(id__lt=100)
        for datum in data:
            datum.id = datum.id + increase_num
            datum.course_outline_id = increase_num
            datum.save()
        data = recommended_textbooks_models.Recommended_Textbooks.objects.filter(id__lt=100)
        data.delete()

        data = required_textbooks_models.Required_Textbooks.objects.filter(id__lt=100)
        for datum in data:
            datum.id = datum.id + increase_num
            datum.course_outline_id = increase_num
            datum.save()
        data = required_textbooks_models.Required_Textbooks.objects.filter(id__lt=100)
        data.delete()

        data = sections_models.Sections.objects.filter(id__lt=100)
        for datum in data:
            datum.id = datum.id + increase_num
            datum.course_outline_id = increase_num
            datum.save()
        data = sections_models.Sections.objects.filter(id__lt=100)
        data.delete()

        data = notes_models.Notes.objects.filter(id__lt=100)
        for datum in data:
            datum.id = datum.id + increase_num
            datum.course_outline_id = increase_num
            datum.save()
        data = notes_models.Notes.objects.filter(id__lt=100)
        data.delete()

        data = instructors_models.Instructors.objects.filter(id__lt=100)
        for datum in data:
            datum.id = datum.id + increase_num
            datum.course_outline_id = increase_num
            datum.save()
        data = instructors_models.Instructors.objects.filter(id__lt=100)
        data.delete()

        data = gpa_conversions_models.GPA_Conversions.objects.filter(id__lt=100)
        for datum in data:
            datum.id = datum.id + increase_num
            datum.course_outline_id = increase_num
            datum.save()
        data = gpa_conversions_models.GPA_Conversions.objects.filter(id__lt=100)
        data.delete()

        data = final_grades_models.Final_Grades.objects.filter(id__lt=100)
        for datum in data:
            datum.id = datum.id + increase_num
            datum.course_outline_id = increase_num
            datum.save()
        data = final_grades_models.Final_Grades.objects.filter(id__lt=100)
        data.delete()

        data = examinations_models.Examinations.objects.filter(id__lt=100)
        for datum in data:
            datum.id = datum.id + increase_num
            datum.course_outline_id = increase_num
            datum.save()
        data = examinations_models.Examinations.objects.filter(id__lt=100)
        data.delete()

        data = course_objectives_models.Course_Objectives.objects.filter(id__lt=100)
        for datum in data:
            datum.id = datum.id + increase_num
            datum.course_outline_id = increase_num
            datum.save()
        data = course_objectives_models.Course_Objectives.objects.filter(id__lt=100)
        data.delete()

        data = calendar_information_models.Calendar_Information.objects.filter(id__lt=100)
        for datum in data:
            datum.id = datum.id + increase_num
            datum.course_outline_id = increase_num
            datum.save()
        data = calendar_information_models.Calendar_Information.objects.filter(id__lt=100)
        data.delete()

        data = calculator_use_models.Calculator_Use.objects.filter(id__lt=100)
        for datum in data:
            datum.id = datum.id + increase_num
            datum.course_outline_id = increase_num
            datum.save()
        data = calculator_use_models.Calculator_Use.objects.filter(id__lt=100)
        data.delete()

        data = teaching_assistants_models.Teaching_Assistants.objects.filter(id__lt=100)
        for datum in data:
            datum.id = datum.id + increase_num
            datum.course_outline_id = increase_num
            datum.save()
        data = teaching_assistants_models.Teaching_Assistants.objects.filter(id__lt=100)
        data.delete()

        data = course_coordinators_models.Course_Coordinators.objects.filter(id__lt=100)
        for datum in data:
            datum.id = datum.id + increase_num
            datum.course_outline_id = increase_num
            datum.save()
        data = course_coordinators_models.Course_Coordinators.objects.filter(id__lt=100)
        data.delete()

        data = graduate_attributes_models.Graduate_Attributes.objects.filter(id__lt=100)
        for datum in data:
            datum.id = datum.id + increase_num
            datum.course_outline_id = increase_num
            datum.save()
        data = graduate_attributes_models.Graduate_Attributes.objects.filter(id__lt=100)
        data.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)






    elif request.method == 'GET':
        return Response(status=status.HTTP_204_NO_CONTENT)

