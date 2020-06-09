from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models
from django.utils.text import Truncator
from django.utils.translation import gettext as _

from users.models import StudyGroup

DEFAULT_TEXT_FIELD_LENGTH = 200


class Survey(models.Model):
    name = models.CharField(max_length=50, null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_open = models.BooleanField(default=False)
    is_published = models.BooleanField(default=False)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='author')
    # multiple_apply = models.BooleanField(default=True)  # разрешено ли проходить опрос более 1 раза
    survey_audience = models.ManyToManyField(settings.AUTH_USER_MODEL, through='Audience')

    def __str__(self):
        return self.name


class Audience(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    survey = models.ForeignKey(Survey, on_delete=models.CASCADE)
    status = models.BooleanField(default=False)  # Прошёл пользователь опрос или нет
    # По-хорошему, статус бы сделать choices 0,1, потому что вдруг в будущем будет нужно больше одного статуса


class Question(models.Model):
    SELECT_ONE = 'SO'
    # MULTISELECT = 'MS'
    SMALL_TEXT = 'ST'

    QUESTION_TYPE_CHOICES = (
        (SELECT_ONE, _('Select question')),
        # (MULTISELECT, _('Multiselect qestion')),
        (SMALL_TEXT, _('Text question')),
    )
    name = models.CharField(max_length=DEFAULT_TEXT_FIELD_LENGTH, null=False, blank=False)
    survey = models.ForeignKey(Survey, on_delete=models.CASCADE, related_name='survey_link')
    order = models.IntegerField()
    question_type = models.CharField(max_length=2, choices=QUESTION_TYPE_CHOICES)

    def __str__(self):
        return '{0} - {1}'.format(self.question_type, self.name)

    def clean(self):
        super(Question, self).clean()
        question_variants = AnswerVariant.objects.filter(question_id=self.id)
        if self.id and self.question_type == Question.SMALL_TEXT and  question_variants.count() > 0:
            raise ValidationError({'question_type': 'Text question can''t have answer variants'})
        # тут надо подумать, как это реализовать. кейс: создали селект вопрос с вариантами ответа, созранили
#         отредачили его, поменяли на текст. удалять варианты ответа при новом сохранении? видимо, да.


class AnswerVariant(models.Model):
    name = models.CharField(max_length=DEFAULT_TEXT_FIELD_LENGTH, null=False, blank=False)
    order = models.IntegerField()
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='question')
    # next_question = models.ForeignKey(Question, null=True, on_delete=models.CASCADE, related_name='next_question')
    # id следующего вопроса. по идее - это должен быть nullable FK.
    # как сохранять в базе id next_question - с фронта приходит дикт вида
    # { question_number_in_survey: next_question_number_in_survey}
    # переопределяем метод save у survey и по порядку сохраняем вопросы. если номер есть в этом дикте, то заносим его
    # в примерно такой же дикт, только с idшниками из базы. и когда все вопросы будут сохранены, то отдельной функцией
    # пробегаемся по базе и проставляем соответствия. по дефолту - NULL.

    def __str__(self):
        # по идее self.question.name создает доп запрос в базу на каждый вызов str. TODO перепиши на cached_property
        return '{0} - {1}'.format(self.name, self.question.name)


class AnswerText(models.Model):
    text = models.CharField(max_length=DEFAULT_TEXT_FIELD_LENGTH, null=False, blank=False)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    survey = models.ForeignKey(Survey, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'question')

    def __str__(self):
        text = Truncator(self.text).chars(75)
        return text


class AnswerSelect(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    answer_variant = models.ForeignKey(AnswerVariant, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    survey = models.ForeignKey(Survey, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'question')

    def __str__(self):
        text = Truncator(self.answer_variant.name).chars(75)
        return text

# class TextQuestion(Question):
#     pass
# # впили сюда many to many с допольнительным полем order
#
#
# class SelectOneQuestion(Question):
#     pass
# # а нужны ли вообще классы TextQuestion и SelectOneQuestion?
#
#
# class TextAnswerVariant(models.Model):
#     text = models.CharField(max_length=DEFAULT_TEXT_FIELD_LENGTH, null=False, blank=False)
#     question = models.ForeignKey(Question, on_delete=models.CASCADE, null=True)
# # порядок вопросов и порядок вариантов ответов
# # есть текстовые вопросы, где ответ - свободный текст(в будущем будет шорт и лонг текст)
# # есть вопросы, где много вариантов ответа и можно выбрать один(радиобаттон)
# # есть вопросы, где много вариантов ответов и можно выбрать несколько(мультиселект)
# # что для них нужно:
# # текстовый вопрос
#
#
# class SelectOneAnswerVariant(models.Model):
#     text = models.CharField(max_length=DEFAULT_TEXT_FIELD_LENGTH, null=False, blank=False)
#     question = models.ForeignKey(Question, on_delete=models.CASCADE)
#     next_question = models.ForeignKey(Question, on_delete=models.CASCADE)
#
#
# class MultipleSelectAnswerVariant(models.Model):
#     text = models.CharField(max_length=DEFAULT_TEXT_FIELD_LENGTH, null=False, blank=False)
#     question = models.ForeignKey(Question, on_delete=models.CASCADE)
#
#
# class QuestionAnswer(models.Model):
#     user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     question = models.ForeignKey(Question, on_delete=models.CASCADE)
#     # и тут нужен внешний ключ на вариант ответа, либо на поле текстовый ответ. либо отнаследовать их от одного класса
#     # либо сделать 3 класса(не кажется это тебе странным? хз)

#
# следует ли переиспользовать ответы на вопросы(вообще, я думаю, что да) единственный аргумент не переиспользовать -
# типа чтобы аналитика не искажалась. но ты рпосто можешь добавить id опроса в where
