from django.urls import path
from . import views

urlpatterns = [
    path('api/surveys/', views.SurveyCreate.as_view()),
    path('api/question/', views.QuestionCreate.as_view()),
]