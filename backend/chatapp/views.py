from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import MuyTokenObtainPairSerializer, AppUserSerializer, \
	ChatSerializer, MessageSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.middleware import csrf
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from django.db.models import Q
from .models import AppUser, Chat, Message

class MuyTokenObtainPairView(TokenObtainPairView):
	serializer_class = MuyTokenObtainPairSerializer

@api_view(['POST'])
def login(request):
	user = get_object_or_404(AppUser, username=request.data['username'])
	if user.check_password(request.data['password']):
		return Response({
			"uuid": user.uuid,
			"username": user.username,
			"first_name": user.first_name,
			"last_name": user.last_name
		})
	return Response({"detail": "Invalid Credentials"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def register(request):
	serializer = AppUserSerializer(data=request.data)
	if serializer.is_valid():
		serializer.save()
		user = AppUser.objects.get(username=serializer.data['username'])
		user.set_password(serializer.data['password'])
		user.save()
		return Response({"success": True, "user": serializer.data})
	return Response({"success": True, "message": serializer.errors})

@api_view(['GET'])
def auth(request):
	user = request.user
	return Response({
		"uuid": user.uuid,
		"username": user.username,
		"first_name": user.first_name,
		"last_name": user.last_name,
		"date_joined": user.date_joined
	})

@api_view(['POST'])
def create_chat(request):
	response = {}
	response['topic'] = request.data['topic']
	response['chatters'] = [request.user.pk]
	for chatter in request.data['chatters']:
		chat_user = AppUser.objects.filter(username=chatter).first()
		response['chatters'].append(chat_user.pk)
	if (len(response['chatters']) < 2):
		return Response({"detail": "No such users"}, status=status.HTTP_404_NOT_FOUND)
	serializer = ChatSerializer(data=response)
	if (serializer.is_valid()):
		serializer.save()
		return Response(serializer.data)
	return Response(serializer.errors)

from django.conf import settings
import requests
import json

# @api_view(['POST'])
# def chat_with_ai(request):
    

@api_view(['POST'])
def message_ai(request):
	message = request.data['content']
	headers = {
		"Content-Type": "application/json",
		"Authorization": f"Bearer {settings.OPENAI_API_KEY}"
	}
	payload = {
		"model": "gpt-3.5-turbo-0125",
		"messages": [
			{
				"role": "system",
				"content": "You are a helpful assistant called Bob."
			},
			{
				"role": "user",
				"content": message
			}
		]	
	}
	url = "https://api.openai.com/v1/chat/completions"
	res = requests.post(url, headers=headers, data=json.dumps(payload)).json()
	print(res)
	response = res["choices"][0]["message"]["content"]
	return Response({
		"success": True,
		"message": response
	})

@api_view(['POST'])
def get_messages(request):
	messages = Message.objects.filter(chat=request.data['chat_id'])
	if messages.exists():
		return Response({
			"success": True,
			"messages": MessageSerializer(messages, many=True).data
		})
	if Chat.objects.filter(id=request.data['chat_id']).exists():
		return Response({
			"success": True,
			"messages": []
		})
	return Response({"detail": "Chat not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def get_users(request):
	query_by = request.data['query_by']
	if query_by == 'all':
		users = AppUser.objects.all()
		return Response({
			"success": True,
			"users": AppUserSerializer(users, many=True).data
		})
	elif query_by == 'username':
		users = AppUser.objects.filter(username__icontains=request.data['query'])
		return Response({
			"success": True,
			"users": AppUserSerializer(users, many=True).data[0:3]
		})
	return Response({"detail": "Chat not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def get_user_chats(request):
	user_1 = request.user
	with_username = request.data['with']
	user_2 = AppUser.objects.filter(username=with_username).first()
	chats = Chat.objects.filter(chatters=user_1).filter(chatters=user_2)
	if chats.exists():
		return Response({
			"success": True,
			"chats": ChatSerializer(chats, many=True).data
		})
	return Response({"detail": "No common chats found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def get_user_info(request):
	target_user = request.data['username']
	target_user = AppUser.objects.filter(username=target_user)
	if target_user.exists():
		user = AppUserSerializer(target_user.first()).data
		return Response({
			"success": True,
			"user": {
				"username": user["username"],
				"first_name": user["first_name"],
				"last_name": user["last_name"],
				"date_joined": user["date_joined"]
			}
		})
	return Response({"detail": "invalid user"}, status=status.HTTP_404_NOT_FOUND)

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

def save_message(data):
	chat = Chat.objects.filter(id=data['chat_id']).first()
	if chat:
		message_data = {}
		message_data['chat'] = chat.pk
		message_data['sender'] = AppUser.objects.filter(uuid=data['from']).first().pk
		message_data['content'] = data['content']
		message = MessageSerializer(data=message_data)
		if message.is_valid():
			message.save()
			return { "ok": True,
				"message": message.data }
		else:
			return { "ok": False, 
				"detail": "Message not valid" }
	return { "ok": False, 
   			"detail": "Chat not found" }

class UserView(viewsets.ModelViewSet):
	serializer_class = AppUserSerializer
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
