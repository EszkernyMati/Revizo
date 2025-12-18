from django.db import models
from django.contrib.auth.models import User

class Car(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cars')
    
    brand = models.CharField(max_length=100)       
    model_name = models.CharField(max_length=100) 
    year = models.DateField()           
    engine = models.CharField(max_length=100)       
    license_plate = models.CharField(max_length=20, unique=True) 
    vin = models.CharField(max_length=17, unique=True)           

    def __str__(self):
        return f"{self.brand} {self.model_name} ({self.license_plate})"