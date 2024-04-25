from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.contrib.auth.models import Group, Permission
import uuid

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
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
    age = models.IntegerField()
    height = models.FloatField(null=True, blank=True)  # Optional field
    weight = models.FloatField(null=True, blank=True)  # Optional field
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    diagnosed_duration = models.CharField(max_length=50, null=True, blank=True)
    dietary_preference = models.CharField(max_length=50, null=True, blank=True)
    diabetesType = models.CharField(max_length=20, choices=DIABETES_TYPE_CHOICES, blank=True)
    allergies = models.CharField(max_length=100, blank=True)

    def set_allergies(self, allergies):
        if len(allergies) == 1:  # Assuming you normalize to ['none'] in the serializer
            self.allergies = allergies[0]
        else:
            self.allergies = ','.join(allergies)
        self.save()
        if isinstance(allergies, list) and len(allergies) == 1:
            self.allergies = allergies[0]
        elif isinstance(allergies, list):
            temp = ''
            for v in allergies:
                temp = temp + ',' + v
            self.allergies = temp

    def get_allergies_list(self):
        # Return the allergies as a list split by commas, if not empty
        if isinstance(self.allergies, list):
            return self.allergies.split(',') if len(self.allergies) > 1 else self.allergies[0]
        else:
            return [self.allergies]

    groups = models.ManyToManyField(
        Group,
        verbose_name='groups',
        blank=True,
        help_text='The groups this user belongs to. A group represents a collection of users who have certain permissions in common.',
        related_name="user_set_custom",  # Changed related_name
        related_query_name="user",
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name='user permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        related_name="user_set_custom",  # Changed related_name
        related_query_name="user_permission",
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    objects = UserManager()

    def __str__(self):
        return self.email
