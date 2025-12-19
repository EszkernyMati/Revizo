from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import *
from .models import *
from rest_framework.exceptions import PermissionDenied

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

class UserProfileView(generics.RetrieveAPIView):
    serializer_class = UserSerializer 
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def get_serializer(self, *args, **kwargs):
        serializer = super().get_serializer(*args, **kwargs)
        
        allowed_fields = {'username', 'cars'}
        
        existing_fields = set(serializer.fields.keys())
        for field_name in existing_fields - allowed_fields:
            serializer.fields.pop(field_name)
            
        return serializer


class CarListCreateView(generics.ListCreateAPIView):
    serializer_class = CarSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Car.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
    
class AppointmentCreateView(generics.ListCreateAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Appointment.objects.filter(car__owner=self.request.user)

    def perform_create(self, serializer):
        car = serializer.validated_data.get('car')
        
        if car.owner != self.request.user:
            raise PermissionDenied("Nie możesz dodać wizyty do auta, którego nie jesteś właścicielem!")
            
        # 3. Jeśli wszystko jest OK, zapisujemy
        serializer.save()

class AppointmentListCreateView(generics.ListCreateAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Appointment.objects.filter(car__owner=self.request.user)

