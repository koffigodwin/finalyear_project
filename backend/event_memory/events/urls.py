from django.urls import path, include
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r"events", EventViewApi, basename='event')

urlpatterns = [
    path('register/', UserRegisterApiView.as_view(), name="registration"),
    path('login/', UserLoginApiView.as_view(), name="Login"),
    path('logout/', LogoutUserApiView.as_view(), name="Logout"),
    path('', include(router.urls)),
    path('usertoken/', CustomAuthToken.as_view(), name="usertoken"),
    path('events/<int:event_id>/', GetEventDetails.as_view(), name="get-event-details"),
    path('events/<int:event_id>/join/', RequestJoinViewApi.as_view(), name="request-join-event"),
    path('events/<int:event_id>/registrations/', ManageEventRegistration.as_view(), name="manage-event-register"),
    path('events/<int:event_id>/registrations/<int:registration_id>/', ManageEventRegistration.as_view(), name="update-registration"),
    path('user/request/', JoinRequestViewApi.as_view(), name="user-requests"),
    path('events/<int:event_id>/uploadphoto/', PhotoUpload.as_view(), name="upload-photo"),
    path('organizerapproval/', OrganizerPhotoAproval.as_view(), name="organizer-photo-approval"),
    path('photo/<int:pk>/validation/', ApprovePhoto.as_view(), name="approve-photo"),
    path("approved/<str:approved>/", PhotoPage.as_view(),name="approved-photos"),
    
]
