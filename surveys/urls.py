from django.urls import path
from . import views

urlpatterns = [
    path('api/surveys/', views.SurveyCreate.as_view(), name='surveys_get_create'),
    path('api/surveys-info/', views.SurveyTitle.as_view(), name='surveys_get_info'),
    path('api/surveys/<int:survey_id>/', views.SurveyDetailView.as_view(), name='survey_detail'),
    path('api/surveys/<int:survey_id>/answers/', views.add_answers, name='survey_add_answers'),
    path('api/surveys/<int:survey_id>/questions/', views.SurveyQuestionsView.as_view(), name='survey_questions'),
    path('api/surveys/<int:survey_id>/report/status/', views.SurveyStatus.as_view(), name='survey_status'),
    path('api/surveys/<int:survey_id>/report/data/', views.survey_data, name='survey_data_report'),
    path('api/surveys/<int:survey_id>/report-data/', views.survey_full_report, name='survey_full_report'),
    path('api/questions/', views.QuestionCreate.as_view(), name='questions_get_create'),
    path('api/answer_variants/', views.AnswerVariantCreate.as_view(), name='answer_variant_get_create'),
    path('api/answer_variants/<int:answer_variant_id>/', views.AnswerVariantDetail.as_view(),
         name='answer_variant_detail'),
]