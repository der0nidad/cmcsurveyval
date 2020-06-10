from django.shortcuts import render

# Create your views here.

# class UserList
from rest_framework import generics

from users.models import StudyGroup
from users.serializers import StudyGroupListSerializer


class StudyGroupList(generics.ListAPIView):
    model = StudyGroup
    serializer_class = StudyGroupListSerializer
