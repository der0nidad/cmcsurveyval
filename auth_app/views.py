from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import redirect

from auth_app.forms import RegisterForm
from cmcsurveyval.settings import LOGIN_URL


def login_view(request):
    username, password = request.POST['username'], request.POST['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return JsonResponse({}, status=200)
    else:
        return JsonResponse({}, status=400)


def register_view(request):
    username, password = request.POST['username'], request.POST['password']
    user = authenticate(request, username=username, password=password)
    if user is None:
        User.objects.create(username=username, email='a@abc.com', password=password)
        return JsonResponse({}, status=200)
    else:
        return JsonResponse({}, status=400)


def logout_view(request):
    logout(request)
    return redirect(LOGIN_URL)
#
#
# # Create your views here.
# def register(response):
#     if response.method == "POST":
#         form = RegisterForm(response.POST)
#         if form.is_valid():
#             form.save()
#
#         return redirect("/home")
#     else:
#         form = RegisterForm()
#
#     return render(response, "register/register.html", {"form": form})
