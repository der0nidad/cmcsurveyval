from cmcsurveyval.settings import LOGIN_URL
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import redirect
from rest_framework.generics import GenericAPIView

from auth_app.serializers import SelfUserSerializer


def login_view(request):
    username, password = request.POST['login'], request.POST['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        user_obj = {
            'username': username,
            'id': user.id
        }
        return JsonResponse({'user': user_obj}, status=200)
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
    return JsonResponse({'next': LOGIN_URL}, status=302)


# TODO: проверь, почему не работает редирект на страницу логина, если пользователь не залогинен
class SelfUserView(LoginRequiredMixin, GenericAPIView):
    model = get_user_model()
    serializer_class = SelfUserSerializer

    def get(self, request):
        User = get_user_model()
        user = User.objects.get(id=request.user.id)
        user_response = {
            'username': user.username,
            'email': user.email,
            'id': user.id,
        }
        # и зачем нам тогда сериалайзер?!
        return JsonResponse({'user': user_response})

#
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
