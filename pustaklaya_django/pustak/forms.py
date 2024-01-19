from django import forms
from .models import Pustak

class PustakForm(forms.ModelForm):
    class Meta:
        model = Pustak
        fields = ['title', 'author', 'info', 'genre', 'book_cover', 'pdf_file']
