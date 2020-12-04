from django.urls import path, re_path
from .views import index, room


app_name = 'chat'

urlpatterns = [
    re_path(r'^(?P<room_name>[^/]+)/$', room, name='room'),
]
