from django.urls import path
from .views import user_signup, user_login, index, upload_book, user_logout, book_view, RegisterView, LoginView, UserDetailsView, BookListView, BookUploadAPIView, BookDetailView
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path("signup/", user_signup, name="signup"),
    path("login/", user_login, name="login"),
    path("logout/", user_logout, name="logout"),
    path("book/<str:book_title>/", book_view, name="book_view"),
    path("", index, name="index"),
    path('upload/', upload_book, name='upload_book'),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/userdetail/', UserDetailsView.as_view(), name='user-details'),
    path('api/books/', BookListView.as_view(), name='book-list'),
    path('api/upload/', BookUploadAPIView.as_view(), name='book-upload'),
     path('api/<int:pk>/', BookDetailView.as_view(), name='book-detail'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)