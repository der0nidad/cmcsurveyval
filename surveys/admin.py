from django.contrib import admin

from surveys.models import Survey, Question, AnswerVariant, AnswerText


class SurveyAdmin(admin.ModelAdmin):
    pass


class QuestionAdmin(admin.ModelAdmin):
    pass


class AnswerVariantAdmin(admin.ModelAdmin):
    pass


class AnswerTextAdmin(admin.ModelAdmin):
    pass


admin.site.register(Survey, SurveyAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(AnswerVariant, AnswerVariantAdmin)
admin.site.register(AnswerText, AnswerTextAdmin)
