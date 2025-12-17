from django.db import models
from django.contrib.auth.models import User

class Samochod(models.Model):
    wlasciciel = models.ForeignKey(User, on_delete=models.CASCADE, related_name='samochody')
    marka = models.CharField(max_length=50, verbose_name="Marka")
    model = models.CharField(max_length=50, verbose_name="Model")
    rok_produkcji = models.IntegerField(verbose_name="Rok produkcji")
    vin = models.CharField(max_length=17, verbose_name="Numer VIN", blank=True)

    def __str__(self):
        return f"{self.marka} {self.model} ({self.wlasciciel.username})"