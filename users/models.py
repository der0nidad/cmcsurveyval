from datetime import date

from django.contrib.auth.models import AbstractUser
from django.db import models


class StudyGroup(models.Model):
    YEAR_IN_CHOICES = (
        ('2016', '2015/2016'),
        ('2017', '2017/2018'),
        ('2018', '2018/2019'),
        ('2019', '2019/2020'),
        ('2020', '2020/2021'),
    )
    year_in = models.CharField(max_length=15, choices=YEAR_IN_CHOICES, default=date.today().year,
                               help_text='год начала обучения(в сентябре)')
    number = models.CharField(max_length=3, null=True)

    def __str__(self):
        return '{0} группа'.format(self.number)


class User(AbstractUser):
    STUDENT_ROLE = 1
    ROLE_CHOICES = (
        (STUDENT_ROLE, 'Студент'),
        (2, 'Преподаватель'),
        (3, 'Администратор'),
    )
    role = models.IntegerField(choices=ROLE_CHOICES, default=STUDENT_ROLE)

    def __str__(self):
        return self.get_full_name()


# TODO: move to separate app
class Subject(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)


class Teacher(User):
    subjects = models.ManyToManyField(Subject)
    study_groups = models.ManyToManyField(StudyGroup)


class Student(User):
    student_id = models.CharField(max_length=10, unique=True, blank=False, null=False)
    study_group = models.ForeignKey(StudyGroup, on_delete=models.CASCADE)

