from rest_framework import serializers
from .models import AppUser, Chat
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MuyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        # ...

        return token

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = AppUser
		fields = ('uuid', 'username', 'email', 'password', 'first_name', 'last_name', 'is_staff', 'is_superuser', 'is_authenticated', 'date_joined')

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ('id', 'topic', 'chatters')