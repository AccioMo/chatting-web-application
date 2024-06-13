from django.db import models
from django.contrib.auth.models import Group, Permission, AbstractUser
from uuid import uuid4

class AppUser(AbstractUser):
	uuid = models.CharField(max_length=255, unique=True, primary_key=True, default=uuid4, editable=False)
	user_permissions = models.ManyToManyField(Permission, related_name='appuser_permissions', blank=True)
	groups = models.ManyToManyField(Group, related_name='appuser_set')
 
	def __str__(self):
		return self.username

class Chat(models.Model):
	id = models.CharField(max_length=255, unique=True, primary_key=True, default=uuid4, editable=False)
	topic = models.CharField(max_length=40, blank=False, default='')
	chatters = models.ManyToManyField(AppUser, related_name='chatters')

	def _str_(self):
		return self.title

class Message(models.Model):
	id = models.CharField(max_length=255, unique=True, primary_key=True, default=uuid4, editable=False)
	chat = models.ForeignKey(Chat, on_delete=models.CASCADE)
	sender = models.ForeignKey(AppUser, related_name='sender', on_delete=models.CASCADE)
	timestamp = models.DateTimeField(auto_now_add=True)
	content = models.TextField()

	def _str_(self):
		return self.title
