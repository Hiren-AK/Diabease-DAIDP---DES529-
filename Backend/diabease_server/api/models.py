from django.db import models
import uuid

class User(models.Model):
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
    ]
    DIABETES_TYPE_CHOICES = [
        ('type 1', 'Type 1'),
        ('type 2', 'Type 2'),
        ('pre-diabetes', 'Prediabetes'),
        ('gestational', 'Gestational'),
        ('none', 'None'),
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)  # Adjusted for hash length
    age = models.IntegerField()
    height = models.FloatField(null=True, blank=True)  # Optional field
    weight = models.FloatField(null=True, blank=True)  # Optional field
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    diagnosed_duration = models.CharField(max_length=50,null=True, blank=True)
    dietary_preference = models.CharField(max_length=50,null=True, blank=True)
    diabetesType = models.CharField(max_length=20, choices=DIABETES_TYPE_CHOICES, blank=True)
    
    # Store allergies as a single string
    allergies = models.CharField(max_length=100, blank=True)

    def set_allergies(self, allergy_list):
        if 'none' in allergy_list and len(allergy_list) == 1:
            self.allergies = 'none'
        else:
            self.allergies = ','.join(allergy_list)

    def get_allergies(self):
        return self.allergies.split(',') if self.allergies else []
