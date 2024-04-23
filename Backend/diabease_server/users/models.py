from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    user_name = models.CharField(max_length=25, null=False, blank=False)
    diabetes_type = models.CharField(max_length=100, null=True, blank=True)
    diagnosis_date = models.DateField(null=True, blank=True)
    # add necessary fields like email, password, date of birth, height, weight, etc.