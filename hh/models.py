from django.db import models

class Message(models.Model):
    content = models.TextField()   # stores string
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content[:50]

