from django.shortcuts import render
from rest_framework import generics

from surveys.models import Survey, Question, AnswerVariant
from surveys.serializers import SurveyCreateSerializer, QuestionCreateSerializer, AnswerVariantCreateSerializer


class SurveyCreate(generics.ListCreateAPIView):
    queryset = Survey.objects.all()
    serializer_class = SurveyCreateSerializer


class QuestionCreate(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionCreateSerializer


class AnswerVariantCreate(generics.ListCreateAPIView):
    queryset = AnswerVariant.objects.all()
    serializer_class = AnswerVariantCreateSerializer
