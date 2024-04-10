from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Customer, RepairPerson, Product, Cart, Payment, Address, CartItem, Category, Chat, Offer, Order, Notification, Service, Review
from django.contrib.auth.hashers import make_password, check_password
from . import products_util  # Importing custom utility for product scraping
from django.core.serializers import serialize
import json
from datetime import datetime,timedelta
import random
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
        user_name = data.get("user_name").strip().capitalize()
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
            user_name = data.get("user_name").strip().capitalize()
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
def update_account(request):
    """
    View function to update account information.

    Accepts POST requests with JSON data containing updated account information.
    Updates the account information in the database.

    Returns:
    - JsonResponse: Response indicating success or failure of the update.
    """
    if request.method == "POST":
        data = json.loads(request.body)
        # user_id = request.user_id  # Assuming you have user authentication and this gives the user ID
        print(data)
        # Update the account information based on user ID
        try:
            customer = Customer.objects.get(id=data.get("id"))
            customer.name = data.get("name", customer.user_name)
            customer.email = data.get("email", customer.email)
            customer.phone_number = data.get("phone_number", customer.phone_number)
            customer.save()
            
            return JsonResponse({"success": "Account updated successfully.", "status": "200"})
        except Customer.DoesNotExist:
            print('error')
            return JsonResponse({"error": "User not found.", "status": "404"})

    return JsonResponse({"error": "Invalid request method.", "status": "400"})

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
        user_name = data.get("user_name").strip().capitalize()
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
        user_name = data.get("user_name").strip().capitalize()
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
        for product in sorted(products,key =lambda x:x.name)
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
        for category in sorted(categories,key=lambda x : x.name)
    ]
    return JsonResponse(categories_data, safe=False)

def get_professionals_by_category(request):
    """
    View function for retrieving professionals by category and location.

    Accepts GET requests with 'id' and 'location' parameters.
    Returns professionals associated with the given category and location as JSON.

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
        
        location = request.GET.get('location')
        professionals = RepairPerson.objects.filter(categories_of_repairs=category, zip_location = location)
        # print(professionals[0].__dict__, professionals[0].zip_location == location)
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
            for professional in sorted(professionals,key=lambda x:x.price_per_hour)
        ]
        
        response = JsonResponse({"professionals": professional_data, "status": "200"})
        response["Access-Control-Allow-Origin"] = "*"  # Allow requests from all origins
        return response
    
    return JsonResponse({"error": "Method not allowed.", "status": "405"})


@csrf_exempt
def get_cart(request):
    if request.method == "GET":
        try:
            customer_id = request.GET.get('customer_id')
            customer = Customer.objects.get(pk=customer_id)
        except Customer.DoesNotExist:
            return JsonResponse({"error": f"Customer with ID {customer_id} does not exist.", "status": "404"})
        
        try:
            cart = Cart.objects.get(customer=customer)
            cart_items = CartItem.objects.filter(cart=cart)
            cart_data = [
                {
                    "id": item.product.id,
                    "name": item.product.name,
                    "price": item.product.price,
                    "image_url": item.product.image_url,
                    "quantity": item.quantity
                }
                for item in sorted(cart_items,key=lambda item:item.product.name)
            ]
            return JsonResponse({"cart_items": cart_data, "status": "200"})
        except Cart.DoesNotExist:
            return JsonResponse({"error": f"Cart for customer {customer_id} does not exist.", "status": "404"})
    
    return JsonResponse({"error": "Method not allowed.", "status": "405"})

@csrf_exempt
def add_to_cart(request):
    if request.method == "POST":
        try:
            customer_id = request.POST.get('customer_id')
            product_id = request.POST.get('product_id')
            customer = Customer.objects.get(pk=customer_id)
            product = Product.objects.get(pk=product_id)
        except (Customer.DoesNotExist, Product.DoesNotExist):
            return JsonResponse({"error": "Customer or product does not exist.", "status": "404"})
        
        try:
            cart = Cart.objects.get(customer=customer)
        except Cart.DoesNotExist:
            cart = Cart.objects.create(customer=customer)
        
        try:
            cart_item = CartItem.objects.get(cart=cart, product=product)
            cart_item.quantity += 1
            cart_item.save()
        except CartItem.DoesNotExist:
            CartItem.objects.create(cart=cart, product=product)
        
        cart_items = CartItem.objects.filter(cart=cart)
        cart_data = [
            {
                "id": item.product.id,
                "name": item.product.name,
                "price": item.product.price,
                "image_url": item.product.image_url,
                "quantity": item.quantity
            }
            for item in cart_items
        ]
        return JsonResponse({"cart_items": cart_data, "status": "200"})
    
    return JsonResponse({"error": "Method not allowed.", "status": "405"})

@csrf_exempt
def remove_from_cart(request):
    if request.method == "POST":
        try:
            customer_id = request.POST.get('customer_id')
            product_id = request.POST.get('product_id')
            customer = Customer.objects.get(pk=customer_id)
            product = Product.objects.get(pk=product_id)
        except (Customer.DoesNotExist, Product.DoesNotExist):
            return JsonResponse({"error": "Customer or product does not exist.", "status": "404"})
        
        try:
            cart = Cart.objects.get(customer=customer)
            cart_item = CartItem.objects.get(cart=cart, product=product)
            if cart_item.quantity > 1:
                cart_item.quantity -= 1
                cart_item.save()
            else:
                cart_item.delete()
            cart_items = CartItem.objects.filter(cart=cart)
            cart_data = [
                {
                    "id": item.product.id,
                    "name": item.product.name,
                    "price": item.product.price,
                    "image_url": item.product.image_url,
                    "quantity": item.quantity
                }
                for item in cart_items
            ]
            return JsonResponse({"cart_items": cart_data, "status": "200"})
        except (Cart.DoesNotExist, CartItem.DoesNotExist):
            return JsonResponse({"error": f"Cart or item not found for customer {customer_id}.", "status": "404"})
    
    return JsonResponse({"error": "Method not allowed.", "status": "405"})


@csrf_exempt
def add_address(request):
    """
    View function for adding a new address.

    Accepts POST requests with JSON data containing address information.
    Registers a new address for the authenticated customer.

    Returns:
    - JsonResponse: Response indicating success or failure of address addition.
    """
    if request.method == "POST":
        data = json.loads(request.body)
        customer_id = data.get("customer_id")
        street_address = data.get("street_address")
        city = data.get("city")
        state = data.get("state")
        postal_code = data.get("postal_code")
        country = data.get("country")
        print(customer_id , street_address , city , state , postal_code , country)
        # Check if all required fields are provided
        if not (customer_id and street_address and city and state and postal_code and country):
            return JsonResponse({"error": "Missing required fields.", "status": "400"})
        # Check if the address already exists for the customer
        if Address.objects.filter(customer_id=customer_id, street_address=street_address, city=city, state=state, postal_code=postal_code, country=country).exists():
            return JsonResponse({"error": "Address already exists for the customer.", "status": "409"})
        # Create a new Address instance and save it to the database
        address = Address(customer_id=customer_id, street_address=street_address, city=city, state=state, postal_code=postal_code, country=country)
        address.save()
        return JsonResponse({"success": "Address added successfully.", "status": "200"})

    return JsonResponse({"error": "Method not allowed.", "status": "405"})


def get_addresses(request):
    """
    View function for retrieving addresses of a customer.

    Accepts GET requests with a 'customer_id' parameter.
    Returns addresses associated with the given customer as JSON.

    Returns:
    - JsonResponse: JSON response containing addresses data.
    """
    if request.method == "GET":
        customer_id = request.GET.get('customer_id')

        if not customer_id:
            return JsonResponse({"error": "Missing customer ID.", "status": "400"})

        try:
            addresses = Address.objects.filter(customer_id=customer_id)
            addresses_data = [
                {
                    "id": address.id,
                    "street_address": address.street_address,
                    "city": address.city,
                    "state": address.state,
                    "postal_code": address.postal_code,
                    "country": address.country
                }
                for address in addresses
            ]
            return JsonResponse({"addresses": addresses_data, "status": "200"})
        except Address.DoesNotExist:
            return JsonResponse({"error": "Addresses not found for the customer.", "status": "404"})

    return JsonResponse({"error": "Method not allowed.", "status": "405"})

@csrf_exempt
def add_payment_option(request):
    """
    View function for adding a new payment method.

    Accepts POST requests with JSON data containing payment information.
    Registers a new payment method for the authenticated customer.

    Returns:
    - JsonResponse: Response indicating success or failure of payment addition.
    """
    if request.method == "POST":
        data = json.loads(request.body)
        customer_id = data.get("customer_id")
        card_number = data.get("card_number")
        card_holder_name = data.get("card_holder_name")
        expiration_date = data.get("expiration_date")
        cvv = data.get("cvv")

        # Check if all required fields are provided
        if not (customer_id and card_number and card_holder_name and expiration_date and cvv):
            return JsonResponse({"error": "Missing required fields.", "status": "400"})
        # Check if the payment option already exists for the customer
        if Payment.objects.filter(customer_id=customer_id, card_number=card_number, card_holder_name=card_holder_name, expiration_date=expiration_date, cvv=cvv).exists():
            return JsonResponse({"error": "Payment method already exists for the customer.", "status": "409"})
        
        # Create a new Payment instance and save it to the database
        payment = Payment(customer_id=customer_id, card_number=card_number, card_holder_name=card_holder_name, expiration_date=expiration_date, cvv=cvv)
        payment.save()
        return JsonResponse({"success": "Payment method added successfully.", "status": "200"})

    return JsonResponse({"error": "Method not allowed.", "status": "405"})


def get_payment_option(request):
    """
    View function for retrieving payment methods of a customer.

    Accepts GET requests with a 'customer_id' parameter.
    Returns payment methods associated with the given customer as JSON.

    Returns:
    - JsonResponse: JSON response containing payment methods data.
    """
    if request.method == "GET":
        customer_id = request.GET.get('customer_id')

        if not customer_id:
            return JsonResponse({"error": "Missing customer ID.", "status": "400"})

        try:
            payments = Payment.objects.filter(customer_id=customer_id)
            payments_data = [
                {
                    "id": payment.id,
                    "card_number": payment.card_number,
                    "card_holder_name": payment.card_holder_name,
                    "expiration_date": payment.expiration_date,
                    "cvv": payment.cvv
                }
                for payment in payments
            ]
            return JsonResponse({"payments": payments_data, "status": "200"})
        except Payment.DoesNotExist:
            return JsonResponse({"error": "Payments not found for the customer.", "status": "404"})

    return JsonResponse({"error": "Method not allowed.", "status": "405"})


@csrf_exempt
def add_order(request):
    """
    View function for adding a new order.

    Accepts POST requests with JSON data containing order information.
    Creates a new order for the authenticated customer.

    Returns:
    - JsonResponse: Response indicating success or failure of order addition.
    """
    if request.method == "POST":
        data = json.loads(request.body)
        customer_id = data.get("customer_id")
        address_id = data.get("address_id")
        payment_id = data.get("payment_id")
        
        # Get selected address and payment details
        try:
            customer = Customer.objects.get(pk=customer_id)
            address = Address.objects.get(pk=address_id)
            payment = Payment.objects.get(pk=payment_id)
        except (Customer.DoesNotExist, Address.DoesNotExist, Payment.DoesNotExist):
            return JsonResponse({"error": "Invalid customer, address, or payment.", "status": "404"})
        
        # Get cart items for the specified customer
        try:
            cart = Cart.objects.get(customer=customer)
            cart_items = CartItem.objects.filter(cart=cart)
        except Cart.DoesNotExist:
            return JsonResponse({"error": "Cart not found for the customer.", "status": "404"})
        
        # Calculate the total cost of the order based on cart items
        total_price = sum(item.product.price * item.quantity for item in cart_items)
        
        # Create a new order instance
        order = Order.objects.create(
            customer=customer,
            address=address,
            order_cost=total_price,
            ordered_date=datetime.now(),
            delivery_date=datetime.now() + timedelta(days=random.randint(3, 10)),
            order_status='Pending'  # Set initial status to 'Pending'
        )
        
        # Add cart items to the order and delete them from the cart
        for item in cart_items:
            order.products.add(item.product)
            item.delete()
        
        # Delete the cart after ordering
        cart.delete()
        
        return JsonResponse({"success": "Order added successfully.", "status": "200"})
    
    return JsonResponse({"error": "Method not allowed.", "status": "405"})


@csrf_exempt
def get_orders(request):
    """
    View function for retrieving orders of a customer.

    Accepts GET requests with a 'customer_id' parameter.
    Returns orders associated with the given customer as JSON.

    Returns:
    - JsonResponse: JSON response containing order data.
    """
    if request.method == "GET":
        customer_id = request.GET.get('customer_id')

        if not customer_id:
            return JsonResponse({"error": "Missing customer ID.", "status": "400"})

        try:
            customer = Customer.objects.get(pk=customer_id)
            orders = Order.objects.filter(customer=customer)
            orders_data = []

            for order in orders:
                products_data = []
                for product in order.products.all():
                    product_data = {
                        "id": product.id,
                        "name": product.name,
                        "price": product.price,
                        "image_url": product.image_url
                    }
                    products_data.append(product_data)

                order_info = {
                    "id": order.id,
                    "ordered_date": order.ordered_date,
                    "delivery_date": order.delivery_date,
                    "order_status": order.order_status,
                    "address": {
                        "id": order.address.id,
                        "street_address": order.address.street_address,
                        "city": order.address.city,
                        "state": order.address.state,
                        "postal_code": order.address.postal_code,
                        "country": order.address.country
                    },
                    "order_cost": order.order_cost,
                    "products": products_data  # Include products information
                }
                orders_data.append(order_info)

            return JsonResponse({"orders": orders_data, "status": "200"})
        except Customer.DoesNotExist:
            return JsonResponse({"error": "Customer not found.", "status": "404"})
        except Order.DoesNotExist:
            return JsonResponse({"error": "Orders not found for the customer.", "status": "404"})
    return JsonResponse({"error": "Method not allowed.", "status": "405"})
