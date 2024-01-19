# Generated by Django 5.0.1 on 2024-01-12 07:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pustak', '0002_pustak_book_cover'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pustak',
            name='publication_date',
        ),
        migrations.AddField(
            model_name='pustak',
            name='info',
            field=models.TextField(max_length=500, null=True),
        ),
    ]