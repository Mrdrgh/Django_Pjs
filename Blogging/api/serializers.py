from  rest_framework import serializers
from .models import Blog
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', "username", "password"]
    
    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        return user

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ['id', 'title', 'content', 'created_at', 'author']
        extra_kwargs = {'author': {'read_only': True}}