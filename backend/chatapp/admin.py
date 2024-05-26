from django.contrib import admin
from .models import AppUser, Chat, Message

class AppUserAdmin(admin.ModelAdmin):
	list_display = ('uuid', 'username', 'email', 'first_name', 'last_name', 'is_staff', 'is_superuser', 'is_authenticated', 'date_joined')

class ChatAdmin(admin.ModelAdmin):
    list_display = ('id', 'topic', 'display_chatters')
    
    def display_chatters(self, obj):
        return ", ".join([chatter.username for chatter in obj.chatters.all()])
    display_chatters.short_description = 'Chatters'

class MessageAdmin(admin.ModelAdmin):
    list_display = ('id', 'chat', 'sender', 'timestamp', 'content')

# Register your models here.

admin.site.register(AppUser, AppUserAdmin)
admin.site.register(Chat, ChatAdmin)
admin.site.register(Message, MessageAdmin)
