from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ChatSerializer
from .models import Chat

# Create your views here.

class ChatView(viewsets.ModelViewSet):
    serializer_class = ChatSerializer
    queryset = Chat.objects.all()
