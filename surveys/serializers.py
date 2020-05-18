from rest_framework import serializers
from .models import Survey, Question, AnswerVariant


class AnswerVariantCreateSerializer(serializers.ModelSerializer):
    question_id = serializers.PrimaryKeyRelatedField(
        queryset=Question.objects.all(), source='question.id')

    class Meta:
        model = AnswerVariant
        fields = ('id', 'name', 'order', 'question_id')

    def create(self, validated_data):
        answer_variant = AnswerVariant.objects.create(
            question=validated_data['question']['id'],
            name=validated_data['name'],
            order=validated_data['order']
        )
        return answer_variant


class QuestionCreateSerializer(serializers.ModelSerializer):
    answers_list = AnswerVariantCreateSerializer(read_only=True, many=True, source='question')
    survey_id = serializers.PrimaryKeyRelatedField(
        queryset=Survey.objects.all(), source='survey.id')

    class Meta:
        model = Question
        fields = ('id', 'name', 'survey_id', 'order', 'question_type', 'answers_list')

    def create(self, validated_data):
        question = Question.objects.create(
            survey=validated_data['survey']['id'],
            name=validated_data['name'],
            order=validated_data['order'],
            type=validated_data['question_type']
        )
        return question


class SurveyCreateSerializer(serializers.ModelSerializer):
    questions_list = QuestionCreateSerializer(read_only=True, many=True, source='survey_link')

    class Meta:
        model = Survey
        fields = ('id', 'name', 'author', 'is_open', 'questions_list')


class SurveyDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Survey
        fields = ('id', 'name', 'author')


# вроде как дублирование с другим сериалайзером для вопросов... хз.
class SurveyQuestionDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        fields = ('id', 'name', 'survey_id', 'order', 'question_type')


class AnswerVariantDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = AnswerVariant
        fields = ('id', 'name', 'question_id', 'order')


class SurveyQuestionsSerializer(serializers.ModelSerializer):
    questions_list = QuestionCreateSerializer(read_only=True, many=True, source='survey_link')

    class Meta:
        model = Survey
        fields = ('id', 'name', 'author', 'questions_list')
