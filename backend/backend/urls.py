"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from chatapp import views
from rest_framework_simplejwt.views import (
	TokenObtainPairView,
	TokenRefreshView,
	TokenVerifyView,
)

router = routers.DefaultRouter()
# router.register(r'chats', views.ChatView, 'chats')
# router.register(r'users', views.UserView, 'users')
# router.register(r'messages', views.MessageView, 'messages')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/users/<str:username>', views.find_user),
    path('api/get_users', views.get_users),
    path('api/create_chat', views.create_chat),
    path('api/get_messages', views.get_messages),
    path('api/get_user_chats', views.get_user_chats),
    # path('api/get_message', views.get_message),
    
    re_path('csrf', views.generate_csrf),
    re_path('login', views.login),
    re_path('register', views.register),
    re_path('auth', views.auth)
]