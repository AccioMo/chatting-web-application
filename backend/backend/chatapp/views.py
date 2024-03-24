from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from .serializers import UserSerializer, ChatSerializer
from django.middleware import csrf
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status
from .models import Chat

# Create your views here.

@api_view(['POST'])
def login(request):
	user = get_object_or_404(User, username=request.data['username'])
	if user.check_password(request.data['password']):
		return Response({"user": user.username, "password": user.password})
	return Response({"detail": "Invalid Credentials"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def signup(request):
	serializer = UserSerializer(data=request.data)
	if serializer.is_valid():
		serializer.save()
		user = User.objects.get(username=serializer.data['username'])
		user.set_password(serializer.data['password'])
		user.save()
		token = Token.objects.create(user=user)
		return Response({"token": token.key, "user": serializer.data})
	return Response(serializer.errors)

@api_view(['GET'])
def generate_csrf(request):
	csrf_token = csrf.get_token(request)
	return Response({csrf_token})

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def check_user_exists(request, username):
    user_exists = User.objects.filter(username=username).exists()
    return Response({'user_exists': user_exists})

class UserView(viewsets.ModelViewSet):
	serializer_class = UserSerializer
	permission_classes = [permissions.IsAuthenticated]
	queryset = User.objects.all()

class ChatView(viewsets.ModelViewSet):
	serializer_class = ChatSerializer
	authentication_classes = [JWTAuthentication]
	permission_classes = [permissions.IsAuthenticated]
	queryset = Chat.objects.all()
