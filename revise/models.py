from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator

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