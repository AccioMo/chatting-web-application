from django.db import models
from django.contrib.auth.models import Group, Permission, AbstractUser
from uuid import uuid4

class AppUser(AbstractUser):
	uuid = models.CharField(max_length=255, unique=True, primary_key=True, default=uuid4, editable=False)
	user_permissions = models.ManyToManyField(Permission, related_name='appuser_permissions')
	groups = models.ManyToManyField(Group, related_name='appuser_set')

	# def save(self, *args, **kwargs):
	# 	return super().save()

class Chat(models.Model):
	id = models.CharField(max_length=255, unique=True, primary_key=True, default=uuid4, editable=False)
	topic = models.CharField(max_length=40, blank=False, default='')
	chatters = models.ManyToManyField(AppUser, related_name='chatters')

	def _str_(self):
		return self.title
