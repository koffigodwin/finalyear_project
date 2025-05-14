from rest_framework.permissions import BasePermission


class IsEventOrganizer(BasePermission):

    def has_permission(self, request, view):
         if not request.user or not request.user.is_authenticated:
              return False
         event_id = view.kwargs.get("event_id")
         return request.user.organized_events.filter(id=event_id).exists()




class IsOrganizerApproval(BasePermission):

     def has_object_permission(self, request, view, obj):
          return obj.event.organized_by == request.user
