from datetime import date

from django.contrib.auth.models import AbstractUser
from django.db import models


class StudyGroup(models.Model):
    YEAR_IN_CHOICES = (
        (2018, '2018/2019'),
        (2019, '2019/2020'),
        (2020, '2020/2021'),
    )
    year_in = models.CharField(max_length=15, choices=YEAR_IN_CHOICES, default=date.today().year, help_text='год начала обучения(в сентябре)')
    number = models.CharField(max_length=3, null=True)


class User(AbstractUser):
    pass

class Subject(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)


class Teacher(User):
    pass


class Student(User):
    student_id = models.CharField(max_length=10, unique=True, blank=False, null=False)
    group = models.ForeignKey(StudyGroup, on_delete=models.CASCADE)

