from django.shortcuts import render
from django.http import HttpResponse
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from .serializers import *
from rest_framework.generics import GenericAPIView, CreateAPIView, UpdateAPIView, ListAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from .models import *
from rest_framework.decorators import action
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404
from .permissions import IsEventOrganizer, IsOrganizerApproval
from rest_framework.parsers import MultiPartParser, FormParser
from django.utils.timezone import now



# Create your views here.
class UserRegisterApiView(GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserRegistrationSerialisze

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        user = serializer.save()
        token = RefreshToken.for_user(user)
        data =serializer.data
        data["tokens"] = {
            "refresh": str(token),
            "access": str(token.access_token)
        }
        return Response(data , status= status.HTTP_201_CREATED)


class UserLoginApiView(GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        user = serializer.validated_data
        serializer = CustomRegistration(user)
        token = RefreshToken.for_user(user)
        data = serializer.data
        data["tokens"] = {
            "refresh": str(token),
            "access": str(token.access_token)
        }
        return Response(data , status= status.HTTP_200_OK)
    

class LogoutUserApiView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):

        try :
            refresh_token = request.data.get("refresh")
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status= status.HTTP_205_RESET_CONTENT )
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class EventViewApi(viewsets.ModelViewSet):
    queryset = Events.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]
    

    def perform_create(self, serializer):
        serializer.save(organized_by=self.request.user)

    def get_queryset(self):
        
        return Events.objects.all()
    

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})


class GetEventDetails(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, event_id):
        event = get_object_or_404(Events, id=event_id)
        serializer = EventSerializer(event)
        return Response(serializer.data)





class RequestJoinViewApi(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, event_id):
        user = request.user
        try:        
            event = Events.objects.get(id=event_id)
        except Events.DoesNotExist:
            return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)  

        if EventRegistration.objects.filter(user=user, event=event).exists():
            return Response({"error": "You have already requested to join this event"}, status=status.HTTP_400_BAD_REQUEST)  

        EventRegistration.objects.create(user=user, event=event)

        return Response({"message": "Request Submitted successfull"}, status=status.HTTP_201_CREATED)

    

class ManageEventRegistration(APIView):
    permission_classes = [IsEventOrganizer]

    def get(self, request, event_id):
        event = get_object_or_404(Events, id=event_id, organized_by= request.user)
        registrations = EventRegistration.objects.filter(event=event) 
        serializer = EventRegistrationSerializer(registrations, many=True)
        return Response(serializer.data)
    
    def patch(self, request, event_id, registration_id):
        event = get_object_or_404(Events, id=event_id, organized_by=request.user)
        registrations = get_object_or_404(EventRegistration, id=registration_id, event=event)

        new_status = request.data.get("status")
        if new_status not in ["approved", "declined"]:
            return Response({"error":"Invalid Status"}, status=status.HTTP_400_BAD_REQUEST)
        
        registrations.status = new_status
        registrations.save()
        return Response({"message":f"Registration {new_status} successfully."})

class JoinRequestViewApi(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        registrations = EventRegistration.objects.filter(user=user)
        serializer = EventRegistrationSerializer(registrations, many=True)
        return Response(serializer.data)    


class PhotoUpload(APIView):
    serializer_class = PhotoSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):   
        serializer = PhotoSerializer(data= request.data)

        if serializer.is_valid():
            serializer.save(uploaded_by=request.user) 
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrganizerPhotoAproval(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PhotoSerializer
    
    def get(self,request):
        photos = Photo.objects.filter(event__organized_by=request.user)
        serializer = PhotoSerializer(photos, many=True)
        return Response(serializer.data) 



class ApprovePhoto(UpdateAPIView):
    permission_classes = [IsAuthenticated,IsOrganizerApproval]
    serializer_class = PhotoSerializer  
    queryset = Photo.objects.all()

    def patch(self, request, pk):
        photo = self.get_object()
        action = request.data.get("action")

        if action == "approve":

           photo.approved = True
           photo.save()
           return Response({'message': 'Photo approved successfully.'}, status=status.HTTP_200_OK)
        
        elif action == "decline":
            photo.approved = False
            photo.save()
            return Response({'message': 'Photo declined successfully.'}, status=status.HTTP_200_OK)
        
        else:
          raise serializers.ValidationError({"error":"Invalid Action. Use 'approve' or 'decline'."})
    


class PhotoPage(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PhotoSerializer

    def get(self, request, approved):
        photos = Photo.objects.filter(approved=approved, event__organized_by=request.user)

        serializer = PhotoSerializer(photos, many=True)
        return Response(serializer.data)
        