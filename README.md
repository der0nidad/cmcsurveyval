# CMCSurveyval - Сервис для проведения онлайн-опросов

Данный проект разработан в рамках выпускной квалификационной работы и предназначен для проведения опросов о качестве
образования на факультете ВМК МГУ. 

#### Live demo
Доступно по [cmcsurveyval.ru](http://cmcsurveyval.ru)

#### Как собрать и запустить проект
Для unix. В проекте используется python 3.6
* Клонируем проект и создаём виртуальное окружение:
```bash
mkdir base_dir && cd base_dir
git clone https://github.com/der0nidad/cmcsurveyval
python3 -m venv env
source env/bin/activate
```
* Устанавливаем зависимости для серверной и клиентской частей:
```bash
cd cmcsurveyval
pip install -r requirements.txt
cd frontend
npm i
```
* Запускаем серверную и клиентскую части:
```bash
cd ..
python manage.py runserver
```

```bash
cd frontend
npm run dev
```

Теперь всё готово для локальной разработки!
