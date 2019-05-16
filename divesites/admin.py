from django.contrib import admin
from .models import Country, Destination, DiveSite
# Register your models here.

admin.site.register(Country)
admin.site.register(Destination)
admin.site.register(DiveSite)
