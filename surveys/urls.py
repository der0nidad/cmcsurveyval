from django.urls import path
from . import views

urlpatterns = [
    path('api/surveys/', views.SurveyCreate.as_view()),
    path('api/questions/', views.QuestionCreate.as_view()),
    path('api/answer_variants/', views.AnswerVariantCreate.as_view()),
]