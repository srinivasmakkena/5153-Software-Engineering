from django.apps import AppConfig

# Defining an application configuration class for the 'api' app
class ApiConfig(AppConfig):
    # Setting the default auto-generated primary key field to 'BigAutoField'
    default_auto_field = 'django.db.models.BigAutoField'
    # Setting the name of the app
    name = 'api'
