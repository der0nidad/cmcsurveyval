import json
from django.http import JsonResponse
from rest_framework import generics

from surveys.models import Survey, Question, AnswerVariant, AnswerText, AnswerSelect
from surveys.serializers import SurveyCreateSerializer, QuestionCreateSerializer, \
    AnswerVariantCreateSerializer, \
    SurveyDetailSerializer, SurveyQuestionsSerializer, SurveyQuestionDetailSerializer, \
    AnswerVariantDetailSerializer, SurveyTitleSerializer


class SurveyTitle(generics.ListAPIView):
    model = Survey
    serializer_class = SurveyTitleSerializer

    def get_queryset(self):
        # TODO добавь фильтрацию опросов, которые уже пройдены пользователем
        return Survey.objects.all()


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

# зачем нам тут drf? что надо сделать? надо создать несколько вариантов ответа - текстовые и селектовые. Для данного
# Пользователя, Вопроса и Опроса(и мб Варианта Ответа)


def add_answers(request, survey_id):
    for question in request.POST:
        data = json.loads(request.POST[question])
        if data.get('type') == Question.SMALL_TEXT:
            answer_text = AnswerText.objects.create(
                user=request.user,
                text=data['answerText'],
                question_id=question,
                survey_id=survey_id
            )
            answer_text.save()
        elif data.get('type') == Question.SELECT_ONE:
            select_answer = AnswerSelect.objects.create(
                user=request.user,
                answer_variant_id=data['answerId'],
                question_id=question,
                survey_id=survey_id
            )
            select_answer.save()
    # TODO добавь отметку о прохождении опроса пользователем
    return JsonResponse({}, status=200)
