from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import *

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('caradd/', CarListCreateView.as_view(), name='car-create'),
    path('cars/', CarListCreateView.as_view(), name='car-list'),
    path('appointments/', VisitListCreateView.as_view(), name='visit-list-create'),
    path('appointmentadd/', AppointmentListCreateView.as_view(), name='appointment-list-create'),
]