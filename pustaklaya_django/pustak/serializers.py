from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Pustak

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username')

class UserWithPasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}
class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username')
class BookUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pustak
        fields = ('id', 'title', 'author', 'info', 'genre', 'book_cover', 'pdf_file')
class BookViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pustak
        fields = ('id', 'title', 'author', 'info', 'genre', 'book_cover', 'pdf_file')