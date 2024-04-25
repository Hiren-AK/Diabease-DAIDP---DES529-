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
        list_serializer_class = serializers.ListSerializer
        

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
    
    def validate_allergies(self, value):
        if isinstance(value, list) and len(value) == 1:
            return value[0]
        elif isinstance(value, list):
            temp = ''
            for v in value:
                temp = temp + ',' + v
            return temp
        return value  # Use set to remove duplicates if necessary
 
    def create(self, validated_data):
        # Hash the password before saving
        validated_data['password'] = make_password(validated_data['password'])
        user = super().create(validated_data)
        user.save()
        return user

    def update(self, instance, validated_data):
        # Check if the password is provided and hash it
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
        allergies = validated_data.pop('allergies', [])
        updated_instance = super().update(instance, validated_data)
        updated_instance.set_allergies(allergies)
        updated_instance.save()
        return updated_instance
