from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# Create your models here.

class CustomUser(AbstractUser):

    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.username

class Events(models.Model):

    title = models.CharField(max_length=100)
    organized_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="organized_events") 
    event_date = models.DateField(null=True)
    description = models.TextField()
    event_image = models.ImageField(upload_to="backend/images/")
    location = models.CharField(max_length=150)
    event_type = models.CharField(max_length=100)
    event_price = models.IntegerField(null=True, blank=True,)
    start_time = models.TimeField()
    end_time = models.TimeField()
    

    def __str__(self):
        return self.title


class EventRegistration(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('declined', 'Declined'),
    ]

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    event = models.ForeignKey(Events, on_delete= models.SET_NULL, null=True, blank=True)
    status = models.CharField(max_length=100, choices=STATUS_CHOICES, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)
    

    class Meta:
        unique_together = ('user', 'event')  # Prevent duplicate registrations

    def __str__(self):
        return f"{self.user.username} - {self.event.title} ({self.status})"
    

class Photo(models.Model):
    event = models.ForeignKey(Events, on_delete=models.CASCADE, related_name="photos")
    uploaded_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete= models.CASCADE)
    photo = models.ImageField(upload_to="event_photos/")
    uploaded_at = models.DateTimeField(auto_now_add=True)
    approved = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.uploaded_by} - {self.event.title}"
