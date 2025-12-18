from django.contrib import admin
from .models import *
@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ('brand', 'model_name', 'year', 'license_plate', 'owner')
    list_filter = ('brand', 'year', 'owner')
    search_fields = ('brand', 'model_name', 'license_plate', 'vin')
    date_hierarchy = 'year'

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('appointment_custom_id', 'car', 'date', 'workshop_name', 'cost')
    list_filter = ('date', 'workshop_name')
    search_fields = ('appointment_custom_id', 'car__license_plate', 'workshop_name')