from django.contrib import admin

from surveys.forms import AnswerVariantAdminForm
from surveys.models import Survey, Question, AnswerVariant, AnswerText, AnswerSelect


class SurveyAdmin(admin.ModelAdmin):
    pass


class QuestionAdmin(admin.ModelAdmin):
    pass


class AnswerVariantAdmin(admin.ModelAdmin):
    form = AnswerVariantAdminForm


class AnswerTextAdmin(admin.ModelAdmin):
    pass


class AnswerSelectAdmin(admin.ModelAdmin):
    pass


admin.site.register(Survey, SurveyAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(AnswerVariant, AnswerVariantAdmin)
admin.site.register(AnswerText, AnswerTextAdmin)
admin.site.register(AnswerSelect, AnswerSelectAdmin)
