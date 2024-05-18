from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializers import MuyTokenObtainPairSerializer, UserSerializer, \
	ChatSerializer, MessageSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.middleware import csrf
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from .models import AppUser, Chat, Message

# Create your views here.

class MuyTokenObtainPairView(TokenObtainPairView):
	serializer_class = MuyTokenObtainPairSerializer

@api_view(['POST'])
def login(request):
	user = get_object_or_404(AppUser, username=request.data['username'])
	if user.check_password(request.data['password']):
		return Response({
			"uuid": user.uuid,
			"user": user.username,
			"first_name": user.first_name,
			"last_name": user.last_name
    	})
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

@api_view(['GET'])
def auth(request):
	user = request.user
	return Response({
		"uuid": user.uuid,
		"user": user.username,
		"first_name": user.first_name,
		"last_name": user.last_name,
		"date_joined": user.date_joined
	})

@api_view(['POST'])
def create_chat(request):
	data = {}
	data['topic'] = request.data['topic']
	data['chatters'] = []
	data['chatters'].append(AppUser.objects.filter(username=request.data['username']).first().pk)
	serializer = ChatSerializer(data=data)
	print(AppUser.objects.filter(username=request.data['username']).first())
	if (serializer.is_valid()):
		serializer.save()
		return Response(serializer.data)
	return Response(serializer.errors)

@api_view(['POST'])
def add_message(request):
	chat = Chat.objects.filter(id=request.data['chat_id']).first()
	if chat:
		message_data = {}
		message_data['chat'] = chat.pk
		message_data['sender'] = AppUser.objects.filter(uuid=request.data['from']).first().pk
		message_data['content'] = request.data['content']
		message = MessageSerializer(data=message_data)
		if message.is_valid():
			message.save()
			return Response({
				"success": True,
				"message": message.data
			})
		else:
			return Response({"detail": "Message not valid"}, status=status.HTTP_400_BAD_REQUEST)
	return Response({"detail": "Chat not found"}, status=status.HTTP_404_NOT_FOUND)

# @api_view(['POST'])
# def get_message(request):
# 	chat = Chat.objects.filter(pk=request.data['chat_id']).first()
# 	if chat:
# 		message = MessageSerializer(data=request.data)
# 		if message.is_valid():
# 			message.save()
# 			return Response({
# 				"topic": chat.topic,
# 				"chatters": chat.chatters,
# 				"messages": chat.messages
# 			})
# 	return Response({"detail": "Chat not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def generate_csrf(request):
	csrf_token = csrf.get_token(request)
	return Response({csrf_token})

@api_view(['GET'])
def find_user(request, username):
    user = AppUser.objects.filter(username=username)
    if user.exists():
   		return Response({'user_exists': user.exists(), 'data': {
			"username": user.first().username,
			"uuid": user.first().uuid,
		}})

class UserView(viewsets.ModelViewSet):
	serializer_class = UserSerializer
	permission_classes = [permissions.IsAuthenticated]
	queryset = AppUser.objects.all()

class ChatView(viewsets.ModelViewSet):
	serializer_class = ChatSerializer
	authentication_classes = [JWTAuthentication]
	permission_classes = [permissions.IsAuthenticated]
	queryset = Chat.objects.all()

class MessageView(viewsets.ModelViewSet):
	serializer_class = MessageSerializer
	authentication_classes = [JWTAuthentication]
	permission_classes = [permissions.IsAuthenticated]
	queryset = Message.objects.all()
