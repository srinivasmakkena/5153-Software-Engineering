from django.contrib import admin
from .models import Customer, Category, RepairPerson, Product, Address, Order, Cart, Payment, Notification, Review, Service, Chat, Offer

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('user_name', 'email', 'phone_number')
    list_filter = ('email', 'phone_number')  # Adding filters for email and phone_number

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')

@admin.register(RepairPerson)
class RepairPersonAdmin(admin.ModelAdmin):
    list_display = ('user_name', 'email', 'phone_number')
    list_filter = ('email', 'phone_number')  # Adding filters for email and phone_number

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price')

@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ('street_address', 'city', 'state', 'postal_code', 'country')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer', 'ordered_date', 'delivery_date', 'order_status', 'order_cost')
    list_filter = ('order_status',)  # Adding filter for order_status

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('customer',)
    list_filter = ('customer',)  # Adding filter for customer

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('customer', 'card_holder_name', 'expiration_date')
    list_filter = ('expiration_date',)  # Adding filter for expiration_date

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('customer', 'notification_title', 'time')
    list_filter = ('time',)  # Adding filter for time

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('review_repair_person', 'review_customer', 'review_rating')
    list_filter = ('review_rating',)  # Adding filter for review_rating

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer_of_service', 'repair_person_of_service', 'date_of_service', 'servicing_status')
    list_filter = ('servicing_status',)  # Adding filter for servicing_status

@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):
    list_display = ('customer', 'repair_person', 'time', 'way_of_msg')
    list_filter = ('time',)  # Adding filter for time

@admin.register(Offer)
class OfferAdmin(admin.ModelAdmin):
    list_display = ('offer_percentage', 'offer_end_date')
    list_filter = ('offer_end_date',)  # Adding filter for offer_end_date
