from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate, login
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer
from .models import User  # Make sure to import the correct User model
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from django.core.signing import Signer
import json

@api_view(['POST'])
def register_user(request):
    try:
        if request.method == 'POST':
            data = request.data
            print(data)
            serializer = UserSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                print(serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except:
        return HttpResponseBadRequest('Invalid request data')
    
@api_view(['POST'])
def login_view(request):
    data = request.data
    print(data)
    email = data.get('email')
    password = data.get('password')
    user = authenticate(request, username=email, password=password)
    if user:
        # User is authenticated, now get full user data
        print("in")
        serializer = UserSerializer(user)
        print("got it")
        return Response({
            'message': 'Login successful',
            'user': serializer.data  # Return the serialized user data
        }, status=200)
    else:
        return Response({'error': 'Invalid credentials'}, status=400)
