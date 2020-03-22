from django.conf import settings
from rest_framework import serializers


class SelfUserSerializer(serializers.ModelSerializer):
    model = settings.AUTH_USER_MODEL
    fields = ('username', 'email')
