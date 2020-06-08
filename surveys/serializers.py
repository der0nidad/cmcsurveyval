from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Survey, Question, AnswerVariant, AnswerSelect, AnswerText


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


class SurveyTitleSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()

    class Meta:
        model = Survey
        fields = ('id', 'name', 'author', 'author_name', 'is_open')

    def get_author_name(self, obj):
        return obj.author.get_full_name()


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


class SurveyStatusSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        lookup_url_kwarg = 'survey_id'
        fields = ('id', 'username', 'first_name', 'last_name')

# class SelectAnswerCreateSerializer(serializers.ModelSerializer):
#     question_id = serializers.PrimaryKeyRelatedField(
#         queryset=Question.objects.all(), source='question.id')
#
#     class Meta:
#         model = AnswerSelect
#         fields = ('id', 'user_id', 'answer_variant_id', 'question_id')
#
#     def create(self, validated_data):
#         select_answer = AnswerSelect.objects.create(
#             question=validated_data['question']['id'],
#             name=validated_data['name'],
#             order=validated_data['order']
#         )
#         return select_answer
#
# class TextAnswerCreateSerializer(serializers.ModelSerializer):
#     question_id = serializers.PrimaryKeyRelatedField(
#         queryset=Question.objects.all(), source='question.id')
#
#     class Meta:
#         model = AnswerText
#         fields = ('id', 'name', 'order', 'question_id')
#
#     def create(self, validated_data):
#         answer_variant = AnswerVariant.objects.create(
#             question=validated_data['question']['id'],
#             name=validated_data['name'],
#             order=validated_data['order']
#         )
#         return answer_variant
