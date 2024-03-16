from django.contrib import admin,auth
from django.urls import path,include
from . import views
from django.contrib.auth import get_user_model

urlpatterns = [
    path('', views.home,name = "home"),
    path("register/",views.register_user,name="register_user"),
    path("login/",views.login_user,name="login_user"),
    path("professional_register/",views.register_professional_user,name="register_professional_user"),
    path("professional_login/",views.login_professional_user,name="login_professional_user"),
    path("get_products/",views.get_products,name="get_products"),
    path("get_categories/",views.get_categories,name="get_categories"),
    # path("add_address/", views.add_address,name = "add_address"),
    # path("get_address/", views.get_address,name = "get_address"),
    # path("add_payment_option/", views.add_payment_option,name = "add_payment_option"),
    # path("get_payment_option/", views.get_payment_option,name = "get_payment_option"),
    # path("add_order/", views.add_order,name = "add_order"),
    # path("get_order_details/", views.get_order_details,name = "get_order_details"),
    # path("add_to_cart/", views.add_to_cart,name = "add_to_cart"),
    # path("get_cart/", views.get_cart,name = "get_cart"),
    # path("remove_from_cart/", views.remove_from_cart,name = "remove_from_cart"),
    # path("add_notification/", views.add_notification,name = "add_notification"),
    # path("get_notifications/", views.get_notifications,name = "get_notifications"),
    # path("get_professionals/",views.get_professionals, name="get_professionals"),

]