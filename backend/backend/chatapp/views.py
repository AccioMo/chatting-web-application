from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from .serializers import UserSerializer, ChatSerializer
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .models import Chat

# Create your views here.



@api_view(['POST'])
def login(request):
	return Response({})

@api_view(['POST'])
def check_token(request):
	return Response({})

class UserView(viewsets.ModelViewSet):
	serializer_class = UserSerializer
	permission_classes = [permissions.IsAuthenticated]
	# @api_view(['POST'])
	def signup(request):
		serializer = UserSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			user = User.objects.get(username=serializer.data['username'])
			token = Token.objects.create(user=user)
			return Response({"token": token.key, "user": serializer.data})
		return Response({"Error": "Invalid data. Please try again."})
	queryset = User.objects.all()

class ChatView(viewsets.ModelViewSet):
	serializer_class = ChatSerializer
	permission_classes = [permissions.IsAuthenticated]
	queryset = Chat.objects.all()
