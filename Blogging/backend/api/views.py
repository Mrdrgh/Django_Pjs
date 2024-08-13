from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import *
from .models import Blog, Profile, Friendship
# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = []

    def perform_create(self, serializer):
        if serializer.is_valid():
            user = serializer.save()
            Profile.objects.create(
                user=user,
                bio='',
                username=user.username
            )
        else:
            print(serializer.error)


class BlogListCreate(generics.ListCreateAPIView):
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        friends = Friendship.objects.filter(user=user).values_list('friend', flat=True)
        return Blog.objects.filter(author__in=[user] + list(friends))

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user.username)
        else:
            print(serializer.error)

class BlogUpdate(generics.UpdateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Blog.objects.filter(author=user)


class BlogDelete(generics.DestroyAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Blog.objects.filter(author=user)


class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserProfileSerializer
    permission_classes= [IsAuthenticated]


    def get_object(self):
        return Profile.objects.get(user=self.request.user)


class FriendshipLisstCreate(generics.ListCreateAPIView):
    queryset = Friendship.objects.all()
    serializer_class= FriendshipSerializer
    permission_classes= []

    def get_queryset(self):
        user = self.request.user
        return Friendship.objects.filter(user=user)
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(user=self.request.user)
        else:
            print(serializer.error)
