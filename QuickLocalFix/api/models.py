from django.db import models
from django.db.models.signals import pre_save, pre_delete  # Importing signals for pre-save and pre-delete operations
from django.dispatch import receiver  # Importing receiver decorator to handle signals
from django.utils import timezone  # Importing timezone utilities
import os  # Importing os module for file operations

# Defining a base User model which is abstract
class User(models.Model):
    user_name = models.CharField(max_length=50, unique=True, null=False)
    password = models.CharField(max_length=128)  
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    
    class Meta:
        abstract = True  # Making User an abstract class

# Customer model inheriting from User
class Customer(User):
    
    def __str__(self):
        return "User :" + self.user_name
    
# Model representing different categories
class Category(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='category_images/')
    description = models.TextField()
    
    def __str__(self):
        return "Category: " + self.name
    
# RepairPerson model inheriting from User
class RepairPerson(User):
    categories_of_repairs = models.ManyToManyField(Category, blank=True)  # A repair person can have many categories of repair
    price_per_hour = models.DecimalField(max_digits=10, decimal_places=2)
    zip_location = models.CharField(max_length=20)
    
    def __str__(self):
        return "Repair Person: " + self.user_name
    
# Model representing products
class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image_url = models.URLField()
    query = models.CharField(max_length=255)
    
    def __str__(self):
        return "Product: "+self.name

# Model representing addresses
class Address(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)  
    street_address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.street_address}, {self.city}, {self.state}, {self.postal_code}, {self.country}"

# Model representing orders
class Order(models.Model):
    ORDER_STATUS_CHOICES = (
        ('Pending', 'Pending'),
        ('Processing', 'Processing'),
        ('Shipped', 'Shipped'),
        ('Delivered', 'Delivered'),
        ('Cancelled', 'Cancelled')
    )

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    products = models.ManyToManyField(Product)
    ordered_date = models.DateTimeField(auto_now_add=True)
    delivery_date = models.DateTimeField(null=True, blank=True)
    order_status = models.CharField(max_length=20, choices=ORDER_STATUS_CHOICES, default='Pending')
    address = models.ForeignKey(Address, on_delete=models.CASCADE)
    order_cost = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Order #{self.id} by {self.customer.user_name}"

# Model representing a shopping cart
class Cart(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)

    def __str__(self):
        return f"Cart for {self.customer.user_name}"

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey('Product', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)  # default quantity is 1

    def __str__(self):
        return f"{self.quantity} x {self.product.name} in cart for {self.cart.customer.user_name}"
    
# Model representing payment information
class Payment(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE) 
    card_number = models.CharField(max_length=19)
    card_holder_name = models.CharField(max_length=255)
    expiration_date = models.CharField(max_length=10)
    cvv = models.CharField(max_length=4)

    def __str__(self):
        return f"Payment method for {self.customer.user_name}"
    
# Model representing notifications for customers
class Notification(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    notification_title = models.CharField(max_length=255)
    notification_text = models.TextField()
    time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.notification_title
    
# Model representing reviews
class Review(models.Model):
    review_repair_person = models.ForeignKey(RepairPerson, on_delete=models.CASCADE)
    review_customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    review_text = models.TextField()
    review_rating = models.PositiveSmallIntegerField()

    def __str__(self):
        return f"Review by {self.review_customer.user_name} for {self.review_repair_person.user_name}"

class Service(models.Model):
    date_of_service = models.DateField()
    customer_of_service = models.ForeignKey(Customer, on_delete=models.CASCADE)
    repair_person_of_service = models.ForeignKey(RepairPerson, on_delete=models.CASCADE)
    servicing_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)  # Default value set to 0
    servicing_status = models.CharField(max_length=50) 
    servicing_address = models.ForeignKey(Address, on_delete=models.CASCADE)
    category_of_service = models.ForeignKey(Category, on_delete=models.CASCADE)
    type_of_service = models.TextField()
    hours_worked = models.DecimalField(max_digits=5, decimal_places=2, default=0)  # Default value set to 0

    def save(self, *args, **kwargs):
        # Calculate the servicing price based on repair person's price per hour and hours worked
        self.servicing_price = self.repair_person_of_service.price_per_hour * self.hours_worked
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Service #{self.id} for {self.customer_of_service.user_name} by {self.repair_person_of_service.user_name}"
# Model representing chat messages between customers and repair persons
class Chat(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='customer_chats')
    repair_person = models.ForeignKey(RepairPerson, on_delete=models.CASCADE)
    text = models.TextField()
    time = models.DateTimeField(auto_now_add=True)
    way_of_msg = models.CharField(max_length=20)

    def __str__(self):
        return f"Chat from {self.customer.user_name} to {self.repair_person.user_name}"

# Model representing offers
class Offer(models.Model):
    offer_percentage = models.DecimalField(max_digits=3, decimal_places=2)
    offer_categories = models.ManyToManyField(Category)
    offer_end_date = models.DateField()

    def __str__(self):
        return f"{self.offer_percentage}% off for {', '.join(str(category) for category in self.offer_categories.all())} until {self.offer_end_date}"

# Signal receiver to delete expired offers before saving
@receiver(pre_save, sender=Offer)
def delete_expired_offer(sender, instance, **kwargs):
    if instance.offer_end_date < timezone.now().date():
        instance.delete()

# Signal receiver to delete category image file before deleting the category instance
@receiver(pre_delete, sender=Category)
def delete_category_image(sender, instance, **kwargs):
    # Delete the image file associated with the category
    if instance.image:
        if os.path.isfile(instance.image.path):
            os.remove(instance.image.path)
