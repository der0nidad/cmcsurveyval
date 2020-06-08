from django import forms
from django.core.exceptions import ValidationError

from surveys.models import Question


class AnswerVariantAdminForm(forms.ModelForm):
    def clean(self):
        if self.cleaned_data['question'].question_type != Question.SELECT_ONE:
            raise ValidationError('Вариант ответа может быть только у вопроса с выбором варианта ответа')
        return self.cleaned_data
