from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
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
	user = User.objects.get(username=request.data['username'])
	if user.check_password(request.data['password']):
		return Response({"user": user.username, "password": user.password})
	return Response({"detail": "Invalid Credentials"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def check_token(request):
	return Response({})

@api_view(['GET'])
def generate_csrf(request):
	csrf_token = csrf.get_token(request)
	return Response({csrf_token})

class UserView(viewsets.ModelViewSet):
	serializer_class = UserSerializer
	permission_classes = [permissions.IsAuthenticated]
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
	queryset = User.objects.all()

class ChatView(viewsets.ModelViewSet):
	serializer_class = ChatSerializer
	authentication_classes = [JWTAuthentication]
	permission_classes = [permissions.IsAuthenticated]
	queryset = Chat.objects.all()
