from  rest_framework import serializers
from .models import Blog, Profile, Friendship
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', "username", "password"]
        extra_kwargs= {'password': {'write_only': True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user



class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model= Profile
        fields= ['id', 'user', 'bio']



class FriendshipSerializer(serializers.ModelSerializer):
    class Meta:
        model= Friendship
        fields= ['id', 'user', 'friend', 'created_at']


class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ['id', 'title', 'content', 'created_at', 'author']
        extra_kwargs = {'author': {'read_only': True}}