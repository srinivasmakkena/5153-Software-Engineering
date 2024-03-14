from django.contrib import admin,auth
from django.urls import path,include
from . import views

from django.contrib.auth import get_user_model
urlpatterns = [
    # Uncomment the next line to enable the admin:
    path('', views.home,name = "home"),
    path("register/",views.register_user,name="register_user"),
    path("login/",views.login_user,name="login_user"),
    path("professional_register/",views.register_professional_user,name="register_professional_user"),
    path("professional_login/",views.login_professional_user,name="login_professional_user"),
    path("get_products/",views.get_products,name="get_products"),
]