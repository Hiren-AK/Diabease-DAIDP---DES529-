from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    # Custom validation for age
    def validate_age(self, value):
        if value < 0:
            raise serializers.ValidationError("Age cannot be negative.")
        return value

    # Custom validation for email uniqueness
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already in use.")
        return value

    # Define fields as optional by setting required=False
    diagnosed_duration = serializers.CharField(required=False)
    dietary_preference = serializers.CharField(required=False)

    class Meta:
        model = User
        fields = ['name', 'email', 'password', 'age', 'gender', 'diagnosed_duration', 'dietary_preference']

    # Overriding create method to remove password hashing
    def create(self, validated_data):
        return super().create(validated_data)
