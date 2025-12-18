from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator
from django.utils import timezone


plate_validator = RegexValidator(
    regex=r'^[A-Z0-9]{2,10}$', 
    message="Numer rejestracyjny musi składać się z 2-10 dużych liter lub cyfr (bez spacji)."
)

vin_validator = RegexValidator(
    regex=r'^[A-HJ-NPR-Z0-9]{17}$',
    message="Niepoprawny format VIN (17 znaków, wykluczając litery I, O, Q)."
)

class Car(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cars')
    
    brand = models.CharField(max_length=100)       
    model_name = models.CharField(max_length=100) 
    year = models.DateField()           
    engine = models.CharField(max_length=100)       
    license_plate = models.CharField(max_length=20, unique=True, validators=[plate_validator]) 
    vin = models.CharField(max_length=17, unique=True,  validators=[vin_validator])           

    def __str__(self):
        return f"{self.brand} {self.model_name} ({self.license_plate})"

class Appointment(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name='appointments')
    
    date = models.DateField()
    workshop_name = models.CharField(max_length=255)
    mileage = models.PositiveIntegerField()
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    notes = models.TextField(blank=True, null=True)
    
    appointment_custom_id = models.CharField(max_length=50, unique=True, editable=False)

    def save(self, *args, **kwargs):
        if not self.appointment_custom_id:
            date_str = self.date.strftime('%Y%m%d')
            self.appointment_custom_id = f"{date_str}-{self.car.owner.id}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Wizyta {self.appointment_custom_id} - {self.car.brand}"