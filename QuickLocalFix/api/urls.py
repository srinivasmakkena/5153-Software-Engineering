from django.contrib import admin, auth  # Importing admin and auth modules from Django
from django.urls import path, include  # Importing path and include functions from Django
from . import views  # Importing views module from the current directory
from django.contrib.auth import get_user_model  # Importing get_user_model function from auth module

urlpatterns = [
    path('', views.home, name="home"),  # Mapping the root URL to the 'home' view function
    path("register/", views.register_user, name="register_user"),  # Mapping '/register/' URL to 'register_user' view function
    path("login/", views.login_user, name="login_user"),  # Mapping '/login/' URL to 'login_user' view function
    path("professional_register/", views.register_professional_user, name="register_professional_user"),  # Mapping '/professional_register/' URL to 'register_professional_user' view function
    path("professional_login/", views.login_professional_user, name="login_professional_user"),  # Mapping '/professional_login/' URL to 'login_professional_user' view function
    path("get_products/", views.get_products, name="get_products"),  # Mapping '/get_products/' URL to 'get_products' view function
    path("get_categories/", views.get_categories, name="get_categories"),  # Mapping '/get_categories/' URL to 'get_categories' view function
    path('categories/', views.get_professionals_by_category, name='get_professionals_by_category'),  # Mapping '/categories/' URL to 'get_professionals_by_category' view function
    path("get_cart/", views.get_cart, name="get_cart"),  # Mapping '/get_cart/' URL to 'get_cart' view function
    path("add_to_cart/", views.add_to_cart, name="add_to_cart"),  # Mapping '/add_to_cart/' URL to 'add_to_cart' view function
    path("remove_from_cart/", views.remove_from_cart, name="remove_from_cart"),  # Mapping '/remove_from_cart/' URL to 'remove_from_cart' view function
    path("add_address/", views.add_address, name="add_address"),  # Mapping '/add_address/' URL to 'add_address' view function
    path("get_address/", views.get_addresses, name="get_address"),  # Mapping '/get_address/' URL to 'get_address' view function
    path('update_account/', views.update_account, name='update_account'),
    path('add_service_request/', views.add_service_request, name='add_service_request'),
    path('get_service_requests/', views.get_service_requests, name='get_service_request'),
    path('get_service_requests_by_customer/', views.get_service_requests_by_customer, name='get_service_requests_by_customer'),
    path('professionals/', views.get_professional_by_id, name='get_professional_by_id'),
    path("add_payment_option/", views.add_payment_option, name="add_payment_option"),  # Mapping '/add_payment_option/' URL to 'add_payment_option' view function
    path("get_payment_option/", views.get_payment_option, name="get_payment_option"),  # Mapping '/get_payment_option/' URL to 'get_payment_option' view function
    path("add_order/", views.add_order, name="add_order"),  # Mapping '/add_order/' URL to 'add_order' view function
    path("get_order_details/", views.get_orders, name="get_orders"),  # Mapping '/get_order_details/' URL to 'get_order_details' view function
    path('update_request', views.update_service_request, name='update_service_request'),
    path('get_user_by_name/', views.get_user_by_name, name='get_user_by_name'),
    path('update_professional_account/', views.update_professional_account, name='update_professional_account'),
    path('fetch-messages/', views.fetch_messages, name='fetch_messages'),
    path('send-message/', views.send_message, name='send_message'),
    path('add-review/', views.add_review, name='add_review'),
    path('fetch-reviews/', views.fetch_reviews, name='fetch_reviews'),
    # path("add_notification/", views.add_notification, name="add_notification"),  # Mapping '/add_notification/' URL to 'add_notification' view function
    # path("get_notifications/", views.get_notifications, name="get_notifications"),  # Mapping '/get_notifications/' URL to 'get_notifications' view function
    # path("get_professionals/", views.get_professionals, name="get_professionals"),  # Mapping '/get_professionals/' URL to 'get_professionals' view function
]
