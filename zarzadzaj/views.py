from django.shortcuts import render, redirect
from django.contrib.auth import views as auth_views
from .forms import *
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
from django.contrib.auth import logout

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
    moje_auta = Samochod.objects.filter(wlasciciel=request.user)
    return render(request, 'zarzadzaj/profile.html', {'auta': moje_auta})

@login_required
def add_car(request):
    if request.method == 'POST':
        form = CarAddingForm(request.POST)
        if form.is_valid():
            samochod = form.save(commit=False)
            samochod.wlasciciel = request.user
            samochod.save()
            return redirect('profile') 
    else:
        form = CarAddingForm()
    return render(request, 'zarzadzaj/addCar.html', {'form': form})



@login_required
def add_visit(request, auto_id):
    auto = get_object_or_404(Samochod, pk=auto_id, wlasciciel=request.user)
    
    if request.method == 'POST':
        form = VisitForm(request.POST)
        if form.is_valid():
            naprawa = form.save(commit=False)
            naprawa.samochod = auto # Przypisujemy naprawę do konkretnego auta
            naprawa.save()
            return redirect('carinfo', auto_id=auto.id) 
    else:
        form = VisitForm()
    
    return render(request, 'zarzadzaj/addVisit.html', {'form': form, 'auto': auto})

@login_required
def car_info(request, auto_id):
    # Pobieramy auto lub wyrzucamy błąd 404, jeśli nie istnieje
    auto = get_object_or_404(Samochod, pk=auto_id, wlasciciel=request.user)
    # Pobieramy naprawy przypisane do tego auta (related_name='naprawy')
    naprawy = auto.naprawy.all() 
    return render(request, 'zarzadzaj/carInfo.html', {'auto': auto, 'naprawy': naprawy})

def log_out(request):
    # logout(request) automatycznie wywołuje request.session.flush()
    logout(request) 
    return redirect('login')

def custom_page_not_found(request, exception):
    return render(request, 'zarzadzaj/notFound.html', status=404)