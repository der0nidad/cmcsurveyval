from django.contrib import admin

from surveys.forms import AnswerVariantAdminForm
from surveys.models import Survey, Question, AnswerVariant, AnswerText


class SurveyAdmin(admin.ModelAdmin):
    pass


class QuestionAdmin(admin.ModelAdmin):
    pass


class AnswerVariantAdmin(admin.ModelAdmin):
    form = AnswerVariantAdminForm


class AnswerTextAdmin(admin.ModelAdmin):
    pass


admin.site.register(Survey, SurveyAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(AnswerVariant, AnswerVariantAdmin)
admin.site.register(AnswerText, AnswerTextAdmin)
