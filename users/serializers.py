from rest_framework import serializers

from users.models import StudyGroup


class StudyGroupListSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudyGroup
        fields = ('id', 'number')
        # как мы курс будем обрабатывать?
