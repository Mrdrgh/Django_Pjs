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
    user = serializers.CharField(source='user.username')
    class Meta:
        model= Profile
        fields= ['id', 'user', 'bio', 'friends', 'profile_picture']



class FriendshipSerializer(serializers.ModelSerializer):
    user_username = serializers.SerializerMethodField()
    friend_username = serializers.SerializerMethodField()


    class Meta:
        model = Friendship
        fields = ['id', 'user_username', 'friend_username', 'created_at', 'friend']

    def get_user_username(self, obj):
        request = self.context.get('request')
        if request and request.user == obj.friend:
            return obj.friend.username
        return obj.user.username

    def get_friend_username(self, obj):
        request = self.context.get('request')
        if request and request.user == obj.friend:
            return obj.user.username
        return obj.friend.username


class BlogSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='author.username', read_only=True)

    class Meta:
        model = Blog
        fields = ['id', 'title', 'content', 'created_at', 'author']