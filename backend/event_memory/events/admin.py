from django.contrib import admin
from .models import CustomUser, Events
from django.contrib.auth.admin import UserAdmin
from .form import CustomUserChangeForm, CustomUserCreationForm

# Register your models here.
admin.site.register(Events)

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
