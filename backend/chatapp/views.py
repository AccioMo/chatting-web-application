from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
from .serializers import MuyTokenObtainPairSerializer, UserSerializer, ChatSerializer
from django.middleware import csrf
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from .models import AppUser, Chat

# Create your views here.

class MuyTokenObtainPairView(TokenObtainPairView):
	serializer_class = MuyTokenObtainPairSerializer

@api_view(['POST'])
def login(request):
	user = get_object_or_404(AppUser, username=request.data['username'])
	if user.check_password(request.data['password']):
		return Response({"user": user.username, "password": user.password})
	return Response({"detail": "Invalid Credentials"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def signup(request):
	serializer = UserSerializer(data=request.data)
	if serializer.is_valid():
		serializer.save()
		user = AppUser.objects.get(username=serializer.data['username'])
		user.set_password(serializer.data['password'])
		user.save()
		return Response({"success": True, "user": serializer.data})
	return Response(serializer.errors)

@api_view(['POST'])
def create_chat(request):
	serializer = ChatSerializer(data=request.data)
	if (serializer.is_valid()):
		serializer.save()
		return Response(serializer.data)
	return Response(serializer.errors)

@api_view(['GET'])
def generate_csrf(request):
	csrf_token = csrf.get_token(request)
	return Response({csrf_token})

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def check_user_exists(request, username):
    user_exists = AppUser.objects.filter(username=username).exists()
    return Response({'user_exists': user_exists})

class UserView(viewsets.ModelViewSet):
	serializer_class = UserSerializer
	permission_classes = [permissions.IsAuthenticated]
	queryset = AppUser.objects.all()

class ChatView(viewsets.ModelViewSet):
	serializer_class = ChatSerializer
	authentication_classes = [JWTAuthentication]
	permission_classes = [permissions.IsAuthenticated]
	queryset = Chat.objects.all()
