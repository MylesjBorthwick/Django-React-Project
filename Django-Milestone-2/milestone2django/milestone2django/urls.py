"""milestone2django URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path               
from rest_framework import routers
from django.conf.urls import url

from recommended_textbooks import views as recommended_textbooks_views                           
from required_textbooks import views as required_textbooks_views                           
from sections import views as sections_views 
from notes import views as notes_views 
from instructors import views as instructors_views  
from gpa_conversions import views as gpa_conversions_views
from final_grades import views as final_grades_views
from examinations import views as examinations_views

from course_objectives import views as course_objectives_views
from calendar_information import views as calendar_information_views
from calculator_use import views as calculator_use_views
from policies import views as policies_views  
from graduate_attributes import views as graduate_attributes_views
from teaching_assistant import views as teaching_assistants_views  
from course_coordinator import views as course_coordinators_views  


from master_update import views as master_views  




urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^api/gpa_conversions/$', gpa_conversions_views.GPA_Conversions_list),
    path('api/gpa_conversions/<int:pk>', gpa_conversions_views.GPA_Conversions_detail),
    re_path(r'^api/recommended_textbooks/$', recommended_textbooks_views.Recommended_Textbooks_list),
    path('api/recommended_textbooks/<int:pk>', recommended_textbooks_views.Recommended_Textbooks_detail),
    re_path(r'^api/required_textbooks/$', required_textbooks_views.Required_Textbooks_list),
    path('api/required_textbooks/<int:pk>', required_textbooks_views.Required_Textbooks_detail),
    re_path(r'^api/sections/$', sections_views.Sections_list),
    path('api/sections/<int:pk>', sections_views.Sections_detail), 

    re_path(r'^api/notes/$', notes_views.Notes_list),
    path('api/notes/<int:pk>', notes_views.Notes_detail), 

    re_path(r'^api/instructors/$', instructors_views.Instructors_list),
    path('api/instructors/<int:pk>', instructors_views.Instructors_detail),   
    re_path(r'^api/final_grades/$', final_grades_views.Final_Grades_list),
    path('api/final_grades/<int:pk>', final_grades_views.Final_Grades_detail), 
    re_path(r'^api/examinations/$', examinations_views.Examinations_list),
    path('api/examinations/<int:pk>', examinations_views.Examinations_detail),
    re_path(r'^api/policies/$', policies_views.Policies_list),
    path('api/policies/<int:pk>', policies_views.Policies_detail),  
    re_path(r'^api/course_objectives/$', course_objectives_views.Course_Objectives_list),
    path('api/course_objectives/<int:pk>', course_objectives_views.Course_Objectives_detail), 
    re_path(r'^api/calendar_information/$', calendar_information_views.Calendar_Information_list),
    path('api/calendar_information/<int:pk>', calendar_information_views.Calendar_Information_detail), 
    re_path(r'^api/calculator_use/$', calculator_use_views.Calculator_Use_list),
    path('api/calculator_use/<int:pk>', calculator_use_views.Calculator_Use_detail), 
    re_path(r'^api/graduate_attributes/$', graduate_attributes_views.Graduate_Attributes_list),
    path('api/graduate_attributes/<int:pk>', graduate_attributes_views.Graduate_Attributes_detail), 
    re_path(r'^api/teaching_assistants/$', teaching_assistants_views.Teaching_Assistants_list),
    path('api/teaching_assistants/<int:pk>', teaching_assistants_views.Teaching_Assistants_detail), 
    re_path(r'^api/course_coordinators/$', course_coordinators_views.Course_Coordinators_list),
    path('api/course_coordinators/<int:pk>', course_coordinators_views.Course_Coordinators_detail), 

    re_path(r'^api/master_update/$', master_views.Master_increase),

]