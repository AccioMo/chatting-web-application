from django.db import models
from django.contrib.auth.models import User

class Chat(models.Model):
	title = models.CharField(max_length=120, blank=False, default='')
	topic = models.CharField(max_length=40, blank=False, default='')
	description = models.TextField()

	def _str_(self):
		return self.title
