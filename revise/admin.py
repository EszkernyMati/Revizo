from django.contrib import admin
from .models import Car
@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ('brand', 'model_name', 'year', 'license_plate', 'owner')
    list_filter = ('brand', 'year', 'owner')
    search_fields = ('brand', 'model_name', 'license_plate', 'vin')
    date_hierarchy = 'year'

