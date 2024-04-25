from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Chat

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('id', 'first_name', 'last_name', 'username', 'email', 'password', 'is_staff', 'is_superuser', 'is_authenticated', 'last_login', 'date_joined')

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ('id', 'title', 'topic', 'description')