from rest_framework import serializers
from .models import AppUser, Chat, Message
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

class AppUserSerializer(serializers.ModelSerializer):
	class Meta:
		model = AppUser
		fields = ('username', 'uuid', 'email', 'password', 'first_name', 'last_name', 'description', 'picture', 'is_staff', 'is_ai', 'is_superuser', 'is_authenticated', 'date_joined')

class ChatSerializer(serializers.ModelSerializer):
	class Meta:
		model = Chat
		fields = ('id', 'topic', 'chatters')

	def to_representation(self, instance):
		self.fields['chatters'] = AppUserSerializer(many=True)
		return super(ChatSerializer, self).to_representation(instance)

	def get_user(self, obj):
		return obj.user.get_full_name()

class MessageSerializer(serializers.ModelSerializer):

	class Meta:
		model = Message
		fields = ('id', 'chat', 'sender', 'timestamp', 'content')

	def to_representation(self, instance):
		self.fields['sender'] = AppUserSerializer()
		return super(MessageSerializer, self).to_representation(instance)
