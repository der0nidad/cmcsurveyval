from rest_framework import serializers
from .models import Survey, Question


class QuestionCreateSerializer(serializers.ModelSerializer):
    survey_id = serializers.PrimaryKeyRelatedField(queryset=Survey.objects.all(), source='survey.id')

    class Meta:
        model = Question
        fields = ('id', 'text', 'survey_id', 'order', 'question_type')

    def create(self, validated_data):
        question = Question.objects.create(
            survey=validated_data['survey']['id'],
            text=validated_data['text'],
            order=validated_data['order'],
            type=validated_data['question_type']
        )

        return question


class SurveyCreateSerializer(serializers.ModelSerializer):
    questions_list = QuestionCreateSerializer(read_only=True, many=True, source='survey_link')

    class Meta:
        model = Survey
        fields = ('id', 'name', 'author', 'is_open', 'multiple_apply', 'questions_list')
