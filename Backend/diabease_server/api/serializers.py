from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import User

class UserSerializer(serializers.ModelSerializer):
    allergies = serializers.ListField(
        child=serializers.CharField(),
        allow_empty=True,
        required=False
    )

    class Meta:
        model = User
        fields = ['name', 'email', 'password', 'age', 'height', 'weight', 'gender', 'diagnosed_duration', 'dietary_preference', 'allergies', 'diabetesType']

    def validate_age(self, value):
        if value < 0:
            raise serializers.ValidationError("Age cannot be negative.")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already in use.")
        return value

    def create(self, validated_data):
        # Handle the allergies array if present.
        if validated_data.get('allergies'):
            validated_data['allergies'] = ','.join(validated_data['allergies'])
        else:
            validated_data['allergies'] = 'none'
        
        # Hash the password before saving
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)
