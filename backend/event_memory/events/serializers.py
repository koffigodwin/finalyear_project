from rest_framework import serializers
from .models import CustomUser, Events, EventRegistration, Photo
from django.contrib.auth import authenticate


class CustomRegistration(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email')

class UserRegistrationSerialisze(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only = True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password1', 'password2', ]
        
    def validate(self, attrs):
        if attrs.get("password1")  != attrs.get("password2") :
            raise serializers.ValidationError({"password2": "password must match"})
        if len(attrs.get("password1", '')) < 8: 
            raise serializers.ValidationError({"password1" : "Password must be at least 8 characters"})
        
        return attrs
    
    def create(self, validated_data):

        password = validated_data.pop("password1")
        validated_data.pop("password2")

        if not password:
            raise serializers.ValidationError({'password1': 'password is required'})
        
        user = CustomUser.objects.create_user(**validated_data, password = password)
        return user
    
class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField() 
    password = serializers.CharField(write_only = True)

    class Meta:
        model = CustomUser
        fields = ["email", "password"]

    def  validate(self, data):
        user = authenticate(**data)
        if  user and user.is_active:
          return user
        raise serializers.ValidationError("Invalid Credntials")
    

class EventSerializer(serializers.ModelSerializer):
    organized_by = serializers.ReadOnlyField(source= "organized_by.username") 
    event_image = serializers.ImageField(use_url=True) 

    class Meta:
        model = Events
        fields = ['id', 'title','organized_by','event_date','description','event_image','location',
                  'event_type','event_price','start_time','end_time']
        
        

class EventRegistrationSerializer(serializers.ModelSerializer):
    user_email = serializers.EmailField(source="user.email", read_only=True)
    event_name = serializers.CharField(source="event.title", read_only=True)
    event_price = serializers.IntegerField(source="event.event_price", read_only=True)  

    class Meta:
        model = EventRegistration
        fields= ['id', 'user', 'user_email', 'event', 'status', 'created_at', 'event_name', 'event_price'] 


class PhotoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Photo
        fields = ['id', 'event', 'uploaded_by', 'photo', 'uploaded_at', 'approved'] 
        read_only_fields = ['uploaded_by', "approved"]           
