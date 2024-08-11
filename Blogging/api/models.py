from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Blog(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateField(auto_now_add=True)

    def __str__(self) -> str:
        return self.author + ': ' + self.title