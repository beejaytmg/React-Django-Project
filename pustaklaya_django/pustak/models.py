from django.db import models

class Pustak(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    info = models.TextField(max_length=500, null=True)
    genre = models.CharField(max_length=255)
    book_cover = models.ImageField(upload_to='book_covers/', null=True)  # Specify the directory for storing book cover images
    pdf_file = models.FileField(upload_to='books/', null=True, blank=True)

    def __str__(self):
        return self.title
