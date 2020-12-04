from django.contrib import admin
from chat.views import symptoms, payments, signin, signup, aboutus, home 
from django.urls import path, include
 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('chat/', include('chat.urls', namespace='chat')),
    path('', home, name='home'),
    path('symptoms/', symptoms, name='symptoms'),
    path('payments/', payments, name='payments'),
    path('signin/', signin, name='signin'),
    path('signup/', signup, name='signup'),
    path('aboutus/', aboutus, name='aboutus'),

]
