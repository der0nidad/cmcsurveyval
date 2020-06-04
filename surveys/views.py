from rest_framework import generics

from surveys.models import Survey, Question, AnswerVariant
from surveys.serializers import SurveyCreateSerializer, QuestionCreateSerializer, \
    AnswerVariantCreateSerializer, \
    SurveyDetailSerializer, SurveyQuestionsSerializer, SurveyQuestionDetailSerializer, \
    AnswerVariantDetailSerializer, SurveyTitleSerializer


class SurveyTitle(generics.ListAPIView):
    queryset = Survey.objects.all()
    serializer_class = SurveyTitleSerializer


class SurveyCreate(generics.ListCreateAPIView):
    queryset = Survey.objects.all()
    serializer_class = SurveyCreateSerializer


class SurveyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Survey.objects.all()
    serializer_class = SurveyDetailSerializer
    lookup_url_kwarg = 'survey_id'


class SurveyQuestionsView(generics.RetrieveAPIView):
    queryset = Survey.objects.all()
    serializer_class = SurveyQuestionsSerializer
    lookup_url_kwarg = 'survey_id'


class QuestionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Question.objects.all()
    serializer_class = SurveyQuestionDetailSerializer
    lookup_url_kwarg = 'question_id'


class QuestionCreate(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionCreateSerializer


class AnswerVariantCreate(generics.ListCreateAPIView):
    queryset = AnswerVariant.objects.all()
    serializer_class = AnswerVariantCreateSerializer


class AnswerVariantDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = AnswerVariant.objects.all()
    serializer_class = AnswerVariantDetailSerializer
    lookup_url_kwarg = 'answer_variant_id'
