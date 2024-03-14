from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
# Create your views here.
from django.views.decorators.csrf import csrf_exempt
from .models import Customer, RepairPerson, Product, Cart, Payment, Address, Category, Chat, Offer, Order, Notification, Service, Review
from django.contrib.auth.hashers import make_password, check_password
from . import products_util
from django.core.serializers import serialize
import json


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
            return JsonResponse({"error":"Registered user successfully.", "status":"200"})
        
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

@csrf_exempt
def register_professional_user(request):
    if request.method == "POST":
        username = request.POST.get("user_name")
        password = request.POST.get("password")
        email = request.POST.get("email")
        phonenumber = request.POST.get("phone_number")
        zip_code = request.POST.get("zip_code")
        price_per_hour = request.POST.get("price_per_hour")
        if RepairPerson.objects.filter(user_name = username).exists():
            return JsonResponse({"error":"Professional User with this username already exists.", "status": "406"})
        else:
            customer = RepairPerson(user_name = username,password = make_password(password),price_per_hour= price_per_hour, email = email,phone_number = phonenumber, zip_location = zip_code)
            customer.save()
            return JsonResponse({"error":"Registered professional user successfully.", "status":"200"})
    return HttpResponse(request)

@csrf_exempt
def login_professional_user(request):
    if request.method == "POST":
        username = request.POST.get("user_name")
        password = request.POST.get("password")
        if Customer.objects.filter(username = username).exists():
            user =  Customer.objects.get(username = username)
            print(password, user.password,username,user.username, check_password(password, user.password))
            if user.username == username and check_password(password,user.password):
                return JsonResponse({"error":"Professional User Logged in successfully.", "status": "200"})    
    
    return JsonResponse({"error":"Invalid Username/Password.", "status":"401"})


def get_products(request):
    query = request.GET.get('query')
    products_list = products_util.scrape_ebay_products(query = query)
    # Add products to the database if they don't already exist
    for item in products_list:
        if not Product.objects.filter(name=item['name'] , query=query).exists():
            # Create new product
            new_product = Product(name=item['name'], price=item['price'], image_url=item['image_url'], query = query)
            new_product.save()
    products = Product.objects.filter(query = query) if query else Product.objects.all()
    # Serialize products to JSON
    products_data = serialize('json', products)

    # Convert serialized data to dictionary
    products_dict = json.loads(products_data)

    return JsonResponse(products_dict, safe=False)