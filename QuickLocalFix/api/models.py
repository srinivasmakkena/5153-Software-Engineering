from django.db import models

# Create your models here.
class Customer(models.Model):
    username = models.CharField(max_length=50, unique = True,null = False)
    password = models.CharField()  # In production you would probably want to store a hashed password
    email = models.EmailField()
    phonenumber = models.CharField(max_length=20)
    # address = models.ManyToManyField(max_length=255)
    # # One customer can have many orders, so we use a ForeignKey relationship
    # orders = models.ManyToManyField('Order', on_delete=models.CASCADE)  # One customer can have many orders
    # # A customer can have many notifications, so we use a ManyToMany relationship
    # notifications = models.ManyToManyField('Notification', blank=True)  # A customer can have many notifications


# class RepairPerson(models.Model):
#     name = models.CharField(max_length=50)
#     password = models.CharField(max_length=50)  # In production you would probably want to store a hashed password
#     email = models.EmailField()
#     phone_number = models.CharField(max_length=20)
#     # A repair person can have many services performed, so we use a ManyToMany relationship
#     services_done = models.ManyToManyField('Service', through='ServiceDone', blank=True)  # A repair person can have many services performed
#     # A repair person can have many services pending, so we use a ManyToMany relationship
#     services_pending = models.ManyToManyField('Service', through='ServicePending', blank=True)  # A repair person can have many services pending
#     # A repair person can have many reviews, so we use a ManyToMany relationship
#     reviews = models.ManyToManyField('Review', blank=True)  # A repair person can have many reviews
#     # A repair person can have many categories of repair, so we use a ManyToMany relationship
#     categories_of_repair = models.ManyToManyField('RepairCategory', blank=True)  # A repair person can have many categories of repair
#     price_per_hour = models.DecimalField(max_digits=10, decimal_places=2)
#     # A repair person can have many notifications, so we use a ManyToMany relationship
#     notifications = models.ManyToManyField('Notification', blank=True)  # A repair person can have many notifications

# class Order(models.Model):
#     customer = models.ForeignKey(Customer, on_delete=models.CASCADE)  # Foreign key to the Customer model
#     order_date = models.DateField(auto_now_add=True)  # Date the order was placed
#     order_status = models.CharField(max_length=50)  # Order status (e.g., "placed", "assigned", "in progress", "completed", "cancelled")
#     assigned_repair_person = models.ForeignKey(RepairPerson, on_delete=models.SET_NULL, null=True, blank=True)  # Repair person assigned to the order
#     # Additional order details (optional)
#     total_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # Total cost of the order
#     estimated_completion_date = models.DateField(null=True, blank=True)  # Estimated completion date
#     description = models.TextField(null=True, blank=True)  # Description of the order

# class OrderItem(models.Model):
#     order = models.ForeignKey(Order, on_delete=models.CASCADE)  # Foreign key to the Order model
#     # Part information
#     part_name = models.CharField(max_length=255)
#     part_price = models.DecimalField(max_digits=10, decimal_places=2)  # Price of the individual item
#     quantity = models.PositiveIntegerField()  # Number of units of the part
#     # Additional item details (optional)
#     description = models.TextField(null=True, blank=True)  # Specific details about the item
