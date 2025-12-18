from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['id', 'brand', 'model_name', 'year', 'engine', 'license_plate', 'vin']
        read_only_fields = ['id'] 
    def validate_vin(self, value):
        if len(value) != 17:
            raise serializers.ValidationError("Numer VIN musi mieć dokładnie 17 znaków.")
        return value
    def validate_year(self, value):
        if value > date.today():
            raise serializers.ValidationError("Data produkcji nie może być późniejsza od teraźniejszości")
        return value

    def validate_license_plate(self, value):
        clean_plate = value.replace(" ", "").upper()
        if len(clean_plate) < 4:
            raise serializers.ValidationError("Numer rejestracyjny jest za krótki.")
        return clean_plate

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    cars = CarSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ("id", "username", "password", "email", "cars")

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user
