from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import *
from django.db.models import Q
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

class UserBlogsList(generics.ListAPIView):
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Blog.objects.filter(author=user)

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


class FriendshipListCreate(generics.ListCreateAPIView):
    serializer_class = FriendshipSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Friendship.objects.filter(
            Q(user=user) | Q(friend=user)
        )

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(user=self.request.user)
        else:
            print(serializer.errors)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.friend == self.request.user:
            representation['friend'] = instance.user.username
        return representation

class FriendshipDelete(generics.DestroyAPIView):
    queryset = Friendship.objects.all()
    serializer_class = FriendshipSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Friendship.objects.filter(
            Q(user=user) | Q(friend=user)
        )

    def perform_destroy(self, instance):
        userProfile = Profile.objects.get(user=instance.user)
        friendProfile = Profile.objects.get(user=instance.friend)
        userProfile.friends -= 1
        friendProfile.friends -= 1
        userProfile.save()
        friendProfile.save()
        instance.delete()