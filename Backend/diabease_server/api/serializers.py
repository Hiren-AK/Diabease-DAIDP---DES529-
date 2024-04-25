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
        fields = ['id', 'name', 'email', 'password', 'age', 'height', 'weight', 'gender', 'diagnosed_duration', 'dietary_preference', 'allergies', 'diabetesType']
        extra_kwargs = {'password': {'write_only': True}}
        

    def validate_age(self, value):
        if value < 0:
            raise serializers.ValidationError("Age cannot be negative.")
        return value

    def validate_email(self, value):
        # Check for email uniqueness except for the instance being updated
        user = User.objects.filter(email=value).exclude(pk=self.instance.id if self.instance else None)
        if user.exists():
            raise serializers.ValidationError("This email is already in use.")
        return value

    def create(self, validated_data):
        # Handle the allergies array if present.
        validated_data['allergies'] = ','.join(validated_data.get('allergies', [])) or 'none'
        
        # Hash the password before saving
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

    def update(self, instance, validated_data):
        # Check if the password is provided and hash it
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
        # Update and return the instance
        return super().update(instance, validated_data)
