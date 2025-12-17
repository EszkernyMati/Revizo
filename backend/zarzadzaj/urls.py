from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', auth_views.LoginView.as_view(template_name='zarzadzaj/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(next_page='/'), name='logout'),
    path('profile/', views.profile, name='profile'),
    path('addcar/',views.add_car, name="addcar"),
    path('carinfo/<int:auto_id>/',views.car_info, name="carinfo"),
    path('addvisit/<int:auto_id>/',views.add_visit, name="addvisit")
]