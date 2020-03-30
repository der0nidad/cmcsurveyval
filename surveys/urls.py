from django.urls import path
from . import views

urlpatterns = [
    path('api/surveys/', views.SurveyCreate.as_view(), name='surveys_get_create'),
    path('api/surveys/<int:survey_id>/', views.SurveyDetailView.as_view(), name='surveys_detail'),
    path('api/questions/', views.QuestionCreate.as_view(), name='questions_get_create'),
    path('api/answer_variants/', views.AnswerVariantCreate.as_view(), name='answer_variant_get_create'),
]