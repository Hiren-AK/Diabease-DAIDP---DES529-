# serializers.py
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import User

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            'id', 'name', 'email', 'password', 'age', 'height', 'weight',
            'gender', 'diagnosed_duration', 'dietary_preference', 'allergies',
            'diabetesType'
        ]
        extra_kwargs = {'password': {'write_only': True}}

    def validate_age(self, value):
        if value < 0:
            raise serializers.ValidationError("Age cannot be negative.")
        return value

    def validate_email(self, value):
        user = User.objects.filter(email=value).exclude(pk=self.instance.id if self.instance else None)
        if user.exists():
            raise serializers.ValidationError("This email is already in use.")
        return value

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
        return super().update(instance, validated_data)
