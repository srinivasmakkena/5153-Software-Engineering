# Importing necessary modules
from django.contrib import admin
from .models import Customer, Category, RepairPerson, Product, Address, Order, Cart, Payment, Notification, Review, Service, Chat, Offer

# Registering models with custom admin interfaces
@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    # Customizing the display fields and filters for the Customer model in the admin interface
    list_display = ('user_name', 'email', 'phone_number')
    list_filter = ('email', 'phone_number')  # Adding filters for email and phone_number

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    # Customizing the display fields for the Category model in the admin interface
    list_display = ('name', 'description')

@admin.register(RepairPerson)
class RepairPersonAdmin(admin.ModelAdmin):
    # Customizing the display fields and filters for the RepairPerson model in the admin interface
    list_display = ('user_name', 'email', 'phone_number')
    list_filter = ('email', 'phone_number')  # Adding filters for email and phone_number

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    # Customizing the display fields for the Product model in the admin interface
    list_display = ('name', 'price')

@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    # Customizing the display fields for the Address model in the admin interface
    list_display = ('street_address', 'city', 'state', 'postal_code', 'country')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    # Customizing the display fields and filters for the Order model in the admin interface
    list_display = ('id', 'customer', 'ordered_date', 'delivery_date', 'order_status', 'order_cost')
    list_filter = ('order_status',)  # Adding filter for order_status

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    # Customizing the display fields and filters for the Cart model in the admin interface
    list_display = ('customer',)
    list_filter = ('customer',)  # Adding filter for customer

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    # Customizing the display fields and filters for the Payment model in the admin interface
    list_display = ('customer', 'card_holder_name', 'expiration_date')
    list_filter = ('expiration_date',)  # Adding filter for expiration_date

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    # Customizing the display fields and filters for the Notification model in the admin interface
    list_display = ('customer', 'notification_title', 'time')
    list_filter = ('time',)  # Adding filter for time

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    # Customizing the display fields and filters for the Review model in the admin interface
    list_display = ('review_repair_person', 'review_customer', 'review_rating')
    list_filter = ('review_rating',)  # Adding filter for review_rating

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    # Customizing the display fields and filters for the Service model in the admin interface
    list_display = ('id', 'customer_of_service', 'repair_person_of_service', 'date_of_service', 'servicing_status')
    list_filter = ('servicing_status',)  # Adding filter for servicing_status

@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):
    # Customizing the display fields and filters for the Chat model in the admin interface
    list_display = ('customer', 'repair_person', 'time', 'way_of_msg')
    list_filter = ('time',)  # Adding filter for time

@admin.register(Offer)
class OfferAdmin(admin.ModelAdmin):
    # Customizing the display fields and filters for the Offer model in the admin interface
    list_display = ('offer_percentage', 'offer_end_date')
    list_filter = ('offer_end_date',)  # Adding filter for offer_end_date
