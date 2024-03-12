from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
# Create your views here.
from django.views.decorators.csrf import csrf_exempt
from .models import Customer
from django.contrib.auth.hashers import make_password, check_password


def home(request):   
    return HttpResponse("QuickLocalFix")

@csrf_exempt
def register_user(request):
    if request.method == "POST":
        username = request.POST.get("user_name")
        password = request.POST.get("password")
        email = request.POST.get("email")
        phonenumber = request.POST.get("phone_number")
        if Customer.objects.filter(username = username).exists():
            return JsonResponse({"error":"User with this username already exists.", "status": "406"})
        else:
            customer = Customer(username = username,password = make_password(password), email = email,phonenumber = phonenumber)
            customer.save()
            return JsonResponse({"error":"Registered successfully.", "status":"200"})
        
    return HttpResponse(request)

@csrf_exempt
def login_user(request):
    if request.method == "POST":
        username = request.POST.get("user_name")
        password = request.POST.get("password")
        if Customer.objects.filter(username = username).exists():
            user =  Customer.objects.get(username = username)
            print(password, user.password,username,user.username, check_password(password, user.password))
            if user.username == username and check_password(password,user.password):
                return JsonResponse({"error":"User Logged in successfully.", "status": "200"})    
    
    return JsonResponse({"error":"Invalid Username/Password.", "status":"401"})