from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import *

class CustomUserForm(UserCreationForm):
    email = forms.EmailField(label="Adres e-mail", required=True)
    first_name = forms.CharField(label="Imię", max_length=30)
    class Meta(UserCreationForm.Meta):
        model = User
        fields = ("username", "first_name", "email","password1","password2")
        labels = {
            'username': 'Nazwa użytkownika',
            'first_name': 'Imię',
            'email': 'Adres e-mail',
            'password1': 'Hasło',
            'password2': 'Powtórz hasło',
        }
        help_texts = {
            'username': 'Twoja nazwa powinna mieć mniej niż 150 znaków. Używaj liter, cyfr i znaków @/./+/-/_ ',
            'password1': 'Twoje hasło powinno zawierać co najmniej 8 różnych znaków oraz różnić się od innych danych na twoim koncie. Hasło nie może być zbyt powszechne', 
            'password2': None,
        }
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['password1'].label='Hasło'
        self.fields['password2'].label='Powtórz hasło'
        self.fields['password1'].help_text = 'Twoje hasło powinno zawierać co najmniej 8 różnych znaków oraz różnić się od innych danych na twoim koncie. Hasło nie może być zbyt powszechne.'
        self.fields['password2'].help_text = 'Wpisz to samo hasło, co w poprzednim polu' 

class CarAddingForm(forms.ModelForm):
    class Meta:
        model = Samochod
        fields = ['marka', 'model', 'rok_produkcji', 'numer_rejestracyjny', 'vin']
        labels = {
            'marka': 'Marka pojazdu',
            'model': 'Model pojazdu',
            'rok_produkcji' : 'rok produkcji',
            'numer_rejestracyjny' : 'numer rejestracjyjny auta',
            'vin' : 'numer vin auta'
        }

class VisitForm(forms.ModelForm):
    class Meta:
        model = Wizyta
        fields = ['nazwa_serwisu', 'data', 'przebieg_wizyty', 'koszt','notatki']
        labels={
            'nazwa_serwisu' : 'nazwa serwisu',
            'data' : 'data',
            'przebieg_wizyty' : 'przebieg wizyty',
            'koszt' : 'koszt',
            'notatki' : 'notatki'

        }
        widgets = {
            'data': forms.DateInput(attrs={'type': 'date'}), # Kalendarz w HTML
        }