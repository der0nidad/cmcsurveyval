from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User, StudyGroup


class StudyGroupAdmin(admin.ModelAdmin):
    pass


admin.site.register(User, UserAdmin)
admin.site.register(StudyGroup, StudyGroupAdmin)
