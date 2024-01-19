from django.shortcuts import redirect, render, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib import messages
from .forms import PustakForm
from .models import Pustak
from django.utils.text import slugify
from django.contrib.auth.models import User
from .serializers import UserSerializer, UserDetailsSerializer, UserWithPasswordSerializer, BookViewSerializer, BookUploadSerializer
from rest_framework import generics, permissions, exceptions, serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
class BookUploadAPIView(APIView):
    queryset = Pustak.objects.all()
    serializer_class = BookUploadSerializer
    def post(self, request, *args, **kwargs):
        
        serializer = BookUploadSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserWithPasswordSerializer
    permission_classes = (permissions.AllowAny,)

    def perform_create(self, serializer):
        user = serializer.save()
        user.set_password(serializer.validated_data['password'])
        user.save()
class LoginView(APIView):
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        username = request.data.get('username', '')
        password = request.data.get('password', '')
        user = User.objects.filter(username=username).first()

        if user is None or not user.check_password(password):
            raise serializers.ValidationError({'detail': 'Invalid credentials'}, code='authentication_failed')

        refresh = RefreshToken.for_user(user)
        
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })

class UserDetailsView(generics.RetrieveAPIView):
    serializer_class = UserDetailsSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # The user is available through the request due to IsAuthenticated permission
        user = self.request.user

        if not user.is_authenticated:
            raise exceptions.NotAuthenticated(detail="User not authenticated", code="user_not_authenticated")

        return user

class BookListView(generics.ListAPIView):
    queryset = Pustak.objects.all()
    serializer_class = BookViewSerializer
class BookDetailView(generics.RetrieveAPIView):
    queryset = Pustak.objects.all()
    serializer_class = BookViewSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

def index(request):
    books = Pustak.objects.all()
    return render(request, 'index.html', {'pustaks':books})

def upload_book(request):
    if request.method == 'POST':
        form = PustakForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('index')  # Redirect to a view displaying a list of books
    else:
        form = PustakForm()
    return render(request, 'upload_book.html', {'form': form})

def user_login(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                messages.success(request, 'Login successful.')
                return redirect('index')
            else:
                messages.error(request, 'Invalid username or password.')
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})

def user_signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, 'Signup successful. You are now logged in.')
            return redirect('index')
    else:
        form = UserCreationForm()
    return render(request, 'signup.html', {'form': form})
def user_logout(request):
    logout(request)
    messages.success(request, 'Logout successful.')
    return redirect('index')
def book_view(request, book_title):
    # URL parameters might have special characters, so slugify them
    slugified_title = slugify(book_title)
    
    # Query the database using the slugified title
    pustak = get_object_or_404(Pustak, title__iexact=slugified_title)

    return render(request, 'book_view.html', {'pustak': pustak})