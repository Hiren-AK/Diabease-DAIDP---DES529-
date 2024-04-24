from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    user_name = models.CharField(max_length=25, null=False, blank=False)
    diabetes_type = models.CharField(max_length=100, null=True, blank=True)
    diagnosis_date = models.DateField(null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    height_cm = models.IntegerField(null=True, blank=True)
    weight_kg = models.IntegerField(null=True, blank=True)
    dietary_preference = models.CharField(max_length=50, null=True, blank=True)
    allergies = models.CharField(max_length=255, null=True, blank=True)

    # Change the related_name for groups and user_permissions
    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        related_name="admin",  # New related_name
        related_query_name="user",
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        related_name="customer",  # New related_name
        related_query_name="user",
    )
