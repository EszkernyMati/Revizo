from django.shortcuts import render, redirect
from django.contrib.auth import views as auth_views
from .forms import *
from django.contrib.auth.decorators import login_required

def register(request):
    if request.method == 'POST':
        form = CustomUserForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login') # Przekieruj na stronę logowania po sukcesie
    else:
        form = CustomUserForm()
    
    return render(request, 'zarzadzaj/register.html', {'form': form})

@login_required
def profile(request):
    return render(request, 'zarzadzaj/profile.html')

@login_required
def add_car(request):
    if request.method == 'POST':
        form = CarAddingForm(request.POST)
        if form.is_valid():
            samochod = form.save(commit=False)
            samochod.wlasciciel = request.user
            samochod.save()
            return redirect('showcars') 
    else:
        form = CarAddingForm()
    return render(request, 'zarzadzaj/addCar.html', {'form': form})

@login_required
def show_cars(request):
    # Pobiera tylko auta należące do zalogowanego użytkownika
    moje_auta = Samochod.objects.filter(wlasciciel=request.user)
    return render(request, 'zarzadzaj/showCars.html', {'auta': moje_auta})
