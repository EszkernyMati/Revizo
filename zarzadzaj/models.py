from django.db import models
from django.contrib.auth.models import User

class Samochod(models.Model):
    wlasciciel = models.ForeignKey(User, on_delete=models.CASCADE, related_name='samochody')
    marka = models.CharField(max_length=50, verbose_name="Marka")
    model = models.CharField(max_length=50, verbose_name="Model")
    rok_produkcji = models.IntegerField(verbose_name="Rok produkcji")
    numer_rejestracyjny=models.CharField(max_length=7, verbose_name="Numer rejestracyjny", default='')
    vin = models.CharField(max_length=17, verbose_name="Numer VIN", blank=True)
    

    def __str__(self):
        return f"{self.marka} {self.model} ({self.wlasciciel.username})"
    
class Wizyta(models.Model):
    samochod=models.ForeignKey(Samochod, on_delete=models.CASCADE, related_name='naprawy')
    nazwa_serwisu=models.CharField(max_length=256, verbose_name="Nazwa warsztatu/serwisu",default='')
    data=models.DateField(verbose_name="data")
    przebieg_wizyty=models.CharField(max_length=256, verbose_name="przebieg_seriwsu",default='')
    koszt = models.DecimalField(max_digits=10, decimal_places=2, null=True, verbose_name="Koszt (PLN)")
    notatki=models.CharField(max_length=256, verbose_name="notatki",default='')

    def __str__(self):
        return f"{self.opis} - {self.samochod.marka} ({self.data_planowana})"