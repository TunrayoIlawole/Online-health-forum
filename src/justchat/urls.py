from django.contrib import admin
from chat.views import symptoms
from django.urls import path, include
 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('chat/', include('chat.urls', namespace='chat')),
    path('symptoms/', symptoms, name='symptoms'),

]
