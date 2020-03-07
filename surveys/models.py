from django.conf import settings
from django.db import models


# Create your models here.
class Survey(models.Model):
    name = models.CharField(max_length=50, null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_open = models.BooleanField(default=False)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    multiple_apply = models.BooleanField(default=True)


class Question(models.Model):
    text = models.CharField(max_length=200, null=False, blank=False)
    survey = models.ForeignKey(Survey, on_delete=models.CASCADE)


class TextQuestion(Question):
    pass
# впили сюда many to many с допольнительным полем order


class SelectOneQuestion(Question):
    pass
# а нужны ли вообще классы TextQuestion и SelectOneQuestion?


class TextAnswerVariant(models.Model):
    text = models.CharField(max_length=200, null=False, blank=False)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, null=True)
# порядок вопросов и порядок вариантов ответов
# есть текстовые вопросы, где ответ - свободный текст(в будущем будет шорт и лонг текст)
# есть вопросы, где много вариантов ответа и можно выбрать один(радиобаттон)
# есть вопросы, где много вариантов ответов и можно выбрать несколько(мультиселект)
# что для них нужно:
# текстовый вопрос


class SelectOneAnswerVariant(models.Model):
    text = models.CharField(max_length=200, null=False, blank=False)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    next_question = models.ForeignKey(Question, on_delete=models.CASCADE)


class MultipleSelectAnswerVariant(models.Model):
    text = models.CharField(max_length=200, null=False, blank=False)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)


class QuestionAnswer(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    # и тут нужен внешний ключ на вариант ответа, либо на поле текстовый ответ. либо отнаследовать их от одного класса
    # либо сделать 3 класса(не кажется это тебе странным? хз)
