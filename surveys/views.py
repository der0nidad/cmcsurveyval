from django.shortcuts import render
from rest_framework import generics

from surveys.models import Survey, Question
from surveys.serializers import SurveyCreateSerializer, QuestionCreateSerializer


class SurveyCreate(generics.ListCreateAPIView):
    queryset = Survey.objects.all()
    serializer_class = SurveyCreateSerializer


class QuestionCreate(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionCreateSerializer

