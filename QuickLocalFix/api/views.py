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
        data = json.loads(request.body) 
        user_name = data.get("user_name")
        password = data.get("password")
        email = data.get("email")
        phone_number = data.get("phone_number")
        print(user_name,email,password,phone_number)
        if Customer.objects.filter(user_name = user_name).exists():
            return JsonResponse({"error":"User with this user name already exists.", "status": "406"})
        else:
            customer = Customer(user_name = user_name,password = make_password(password), email = email,phone_number = phone_number)
            customer.save()
            return JsonResponse({"success":"Registered user successfully.", "status":"200"})
        
    return HttpResponse(request)

@csrf_exempt
def login_user(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)  # Parse JSON data from request body
            user_name = data.get("user_name")
            password = data.get("password")

            if user_name and password:
                if Customer.objects.filter(user_name=user_name).exists():
                    user = Customer.objects.get(user_name=user_name)
                    if user.user_name == user_name and check_password(password, user.password):
                        serialized_user = serialize('json', [user,])
                        serialized_user_data = json.loads(serialized_user)[0]['fields']
                        serialized_user_data['id'] = user.id 
                        return JsonResponse({"success": "User logged in successfully.", "status": 200,"customer": serialized_user_data})
                return JsonResponse({"error": "Invalid username/password.", "status": 401})
            else:
                return JsonResponse({"error": "Missing username/password.", "status": 400})
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data.", "status": 400})

    return JsonResponse({"error": "Method not allowed.", "status": 405})

@csrf_exempt
def register_professional_user(request):
    if request.method == "POST":
        data = json.loads(request.body)
        user_name = data.get("user_name")
        password = data.get("password")
        email = data.get("email")
        phone_number = data.get("phone_number")
        zip_code = data.get("zip_code")
        category_name = data.get("category")
        price_per_hour = data.get("price_per_hour")
        
        # Check if the category exists
        try:
            category = Category.objects.get(name=category_name)
        except Category.DoesNotExist:
            return JsonResponse({"error": f"Category '{category_name}' does not exist.", "status": "400"})

        # Check if the user_name already exists
        if RepairPerson.objects.filter(user_name=user_name).exists():
            return JsonResponse({"error": "Professional User with this user_name already exists.", "status": "406"})
        else:
            # Create a new RepairPerson instance and set categories_of_repairs using set()
            repair_person = RepairPerson.objects.create(
                user_name=user_name,
                password=make_password(password),
                price_per_hour=price_per_hour,
                email=email,
                phone_number=phone_number,
                zip_location=zip_code,
            )
            repair_person.categories_of_repairs.add(category)  # Set the many-to-many relationship
            return JsonResponse({"success": "Registered professional user successfully.", "status": "200"})
        
    return HttpResponse(request)

@csrf_exempt
def login_professional_user(request):
    if request.method == "POST":
        data = json.loads(request.body)
        user_name = data.get("user_name")
        password = data.get("password")
        
        if RepairPerson.objects.filter(user_name=user_name).exists():
            user = RepairPerson.objects.get(user_name=user_name)
            if user.user_name == user_name and check_password(password, user.password):
                serialized_user = serialize('json', [user,])
                serialized_user_data = json.loads(serialized_user)[0]['fields']
                serialized_user_data['id'] = user.id 
                return JsonResponse({"success": "Professional User logged in successfully.", "status": "200", "professional": serialized_user_data})
        
    return JsonResponse({"error": "Invalid user_name/password.", "status": "401"})

def get_products(request):
    query = request.GET.get('query')
    if query == None:
        query = ""
    products_list = products_util.scrape_ebay_products(query = query)
    # Add products to the database if they don't already exist
    for item in products_list:
        if not Product.objects.filter(name=item['name'] , query=query).exists():
            # Create new product
            new_product = Product(name=item['name'], price=item['price'], image_url=item['image_url'], query = query)
            new_product.save()
    products = Product.objects.filter(query = query) if query else Product.objects.all()
    # Serialize products to JSON
    products_data = []
    for product in products:
        product_data = {
            'id': product.id,
            'name': product.name,
            'price': product.price,
            'image_url': product.image_url,  # Include the image URL
            'query': product.query
        }
        products_data.append(product_data)

    return JsonResponse(products_data, safe=False)

def get_categories(request):
    categories = Category.objects.all()

    # Manually serialize categories data
    categories_data = []
    for category in categories:
        category_data = {
            'id': category.id,
            'name': category.name,
            'description': category.description,
            'image_url': category.image.url  # Get the URL of the image
        }
        categories_data.append(category_data)

    return JsonResponse(categories_data, safe=False)


def get_professionals_by_category(request):
    if request.method == "GET":
        try:
            category_id = request.GET.get('id')
            category = Category.objects.get(pk=category_id)
        except Category.DoesNotExist:
            return JsonResponse({"error": f"Category with ID {category_id} does not exist.", "status": "404"})

        professionals = RepairPerson.objects.filter(categories_of_repairs=category)
        professional_data = [
            {
                "id": professional.id,
                "user_name": professional.user_name,
                "email": professional.email,
                "phone_number": professional.phone_number,
                "zip_location": professional.zip_location,
                "price_per_hour": professional.price_per_hour
                # Add more fields as needed
            }
            for professional in professionals
        ]
        print(professional_data)
        response = JsonResponse({"professionals": professional_data, "status": "200"})
        response["Access-Control-Allow-Origin"] = "*"  # Allow requests from all origins
        return response

    return JsonResponse({"error": "Method not allowed.", "status": "405"})