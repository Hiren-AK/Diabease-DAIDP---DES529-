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
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    diagnosed_duration = models.CharField(max_length=50)
    dietary_preference = models.CharField(max_length=50)
