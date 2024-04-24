from django.db import models

class User(models.Model):
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
    ]
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=50)  # For prototype only, otherwise use Django's user authentication
    age = models.IntegerField()
    height = models.FloatField(null=True, blank=True)  # Optional field
    weight = models.FloatField(null=True, blank=True)  # Optional field
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    diagnosed_duration = models.CharField(max_length=50, null=True, blank=True)  # Optional field
    dietary_preference = models.CharField(max_length=50, null=True, blank=True)  # Optional field
    allergies = models.CharField(max_length=100, null=True, blank=True)  # Optional field
