from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Customer, RepairPerson, Product, Cart, Payment, Address, Category, Chat, Offer, Order, Notification, Service, Review
from django.contrib.auth.hashers import make_password, check_password
from . import products_util  # Importing custom utility for product scraping
from django.core.serializers import serialize
import json

def home(request):
    """
    View function for the home page.

    Returns:
    - HttpResponse: A simple HTTP response with "QuickLocalFix".
    """
    return HttpResponse("QuickLocalFix")

@csrf_exempt
def register_user(request):
    """
    View function for user registration.

    Accepts POST requests with JSON data containing user information.
    Registers a new customer if the user name is unique.

    Returns:
    - JsonResponse: Response indicating success or failure of registration.
    """
    if request.method == "POST":
        data = json.loads(request.body)
        user_name = data.get("user_name")
        password = data.get("password")
        email = data.get("email")
        phone_number = data.get("phone_number")
        
        # Check if the user name already exists
        if Customer.objects.filter(user_name=user_name).exists():
            return JsonResponse({"error": "User with this user name already exists.", "status": "406"})
        else:
            # Create a new Customer instance and save it to the database
            customer = Customer(user_name=user_name, password=make_password(password), email=email, phone_number=phone_number)
            customer.save()
            return JsonResponse({"success": "Registered user successfully.", "status": "200"})
        
    return HttpResponse(request)

@csrf_exempt
def login_user(request):
    """
    View function for user login.

    Accepts POST requests with JSON data containing user credentials.
    Authenticates the user and returns user data upon successful login.

    Returns:
    - JsonResponse: Response containing user data upon successful login or error message.
    """
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            user_name = data.get("user_name")
            password = data.get("password")
            
            # Check if both user_name and password are provided
            if user_name and password:
                if Customer.objects.filter(user_name=user_name).exists():
                    user = Customer.objects.get(user_name=user_name)
                    # Verify the password
                    if user.user_name == user_name and check_password(password, user.password):
                        # Serialize user data and return as JSON response
                        serialized_user = serialize('json', [user,])
                        serialized_user_data = json.loads(serialized_user)[0]['fields']
                        serialized_user_data['id'] = user.id 
                        return JsonResponse({"success": "User logged in successfully.", "status": "200", "customer": serialized_user_data})
                return JsonResponse({"error": "Invalid username/password.", "status": "401"})
            else:
                return JsonResponse({"error": "Missing username/password.", "status": "400"})
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data.", "status": "400"})
    
    return JsonResponse({"error": "Method not allowed.", "status": "405"})

@csrf_exempt
def register_professional_user(request):
    """
    View function for professional user registration.

    Accepts POST requests with JSON data containing professional user information.
    Registers a new repair person if the user name is unique and the category exists.

    Returns:
    - JsonResponse: Response indicating success or failure of registration.
    """
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
            # Create a new RepairPerson instance and set categories_of_repairs using add()
            repair_person = RepairPerson.objects.create(
                user_name=user_name,
                password=make_password(password),
                price_per_hour=price_per_hour,
                email=email,
                phone_number=phone_number,
                zip_location=zip_code,
            )
            repair_person.categories_of_repairs.add(category)
            return JsonResponse({"success": "Registered professional user successfully.", "status": "200"})
        
    return HttpResponse(request)

@csrf_exempt
def login_professional_user(request):
    """
    View function for professional user login.

    Accepts POST requests with JSON data containing professional user credentials.
    Authenticates the user and returns user data upon successful login.

    Args:
    - request: HttpRequest object.

    Returns:
    - JsonResponse: Response containing professional user data upon successful login or error message.
    """
    if request.method == "POST":
        data = json.loads(request.body)
        user_name = data.get("user_name")
        password = data.get("password")
        
        if RepairPerson.objects.filter(user_name=user_name).exists():
            user = RepairPerson.objects.get(user_name=user_name)
            if user.user_name == user_name and check_password(password, user.password):
                # Serialize user data and include user ID
                serialized_user = serialize('json', [user,])
                serialized_user_data = json.loads(serialized_user)[0]['fields']
                serialized_user_data['id'] = user.id 
                return JsonResponse({"success": "Professional User logged in successfully.", "status": "200", "professional": serialized_user_data})
        
    return JsonResponse({"error": "Invalid user_name/password.", "status": "401"})

def get_products(request):
    """
    View function for retrieving products.

    Accepts GET requests with an optional 'query' parameter.
    Scrapes eBay products based on the query and returns them as JSON.

    Args:
    - request: HttpRequest object.

    Returns:
    - JsonResponse: JSON response containing product data.
    """
    query = request.GET.get('query', '')
    products_list = products_util.scrape_ebay_products(query=query)
    # Add scraped products to the database if they don't already exist
    for item in products_list:
        if not Product.objects.filter(name=item['name'], query=query).exists():
            new_product = Product(name=item['name'], price=item['price'], image_url=item['image_url'], query=query)
            new_product.save()
    products = Product.objects.filter(query=query) if query else Product.objects.all()
    # Serialize products to JSON
    products_data = [
        {
            'id': product.id,
            'name': product.name,
            'price': product.price,
            'image_url': product.image_url,  # Include the image URL
            'query': product.query
        }
        for product in products
    ]
    return JsonResponse(products_data, safe=False)

def get_categories(request):
    """
    View function for retrieving categories.

    Args:
    - request: HttpRequest object.

    Returns:
    - JsonResponse: JSON response containing category data.
    """
    categories = Category.objects.all()
    # Manually serialize category data
    categories_data = [
        {
            'id': category.id,
            'name': category.name,
            'description': category.description,
            'image_url': category.image.url  # Get the URL of the image
        }
        for category in categories
    ]
    return JsonResponse(categories_data, safe=False)

def get_professionals_by_category(request):
    """
    View function for retrieving professionals by category.

    Accepts GET requests with an 'id' parameter indicating the category ID.
    Returns professionals associated with the given category as JSON.

    Args:
    - request: HttpRequest object.

    Returns:
    - JsonResponse: JSON response containing professional data.
    """
    if request.method == "GET":
        try:
            category_id = request.GET.get('id')
            category = Category.objects.get(pk=category_id)
        except Category.DoesNotExist:
            return JsonResponse({"error": f"Category with ID {category_id} does not exist.", "status": "404"})
        professionals = RepairPerson.objects.filter(categories_of_repairs=category)
        # Serialize professional data
        professional_data = [
            {
                "id": professional.id,
                "user_name": professional.user_name,
                "email": professional.email,
                "phone_number": professional.phone_number,
                "zip_location": professional.zip_location,
                "price_per_hour": professional.price_per_hour
            }
            for professional in professionals
        ]
        response = JsonResponse({"professionals": professional_data, "status": "200"})
        response["Access-Control-Allow-Origin"] = "*"  # Allow requests from all origins
        return response
    return JsonResponse({"error": "Method not allowed.", "status": "405"})