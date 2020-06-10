# Generated by Django 3.0.3 on 2020-06-10 21:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_auto_20200515_1612'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='role',
            field=models.IntegerField(choices=[(1, 'Студент'), (2, 'Преподаватель'), (3, 'Администратор')], default=1),
        ),
        migrations.AlterField(
            model_name='studygroup',
            name='year_in',
            field=models.CharField(choices=[('2016', '2015/2016'), ('2017', '2017/2018'), ('2018', '2018/2019'), ('2019', '2019/2020'), ('2020', '2020/2021')], default=2020, help_text='год начала обучения(в сентябре)', max_length=15),
        ),
    ]
