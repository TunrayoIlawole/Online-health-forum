from django.contrib import admin
from chat.views import symptoms, payments, signin, register, aboutus, home, PaymentView
from django.urls import path, include, reverse 
from django.contrib.auth import views as auth_views

 

urlpatterns = [
    path('accounts/', include('django.contrib.auth.urls')),
    path('admin/', admin.site.urls),
    path('chat/', include('chat.urls', namespace='chat')),
    path('accounts/', include('django.contrib.auth.urls')),
    path('', home, name='home'),
    path('symptoms/', symptoms, name='symptoms'),
    path('payments/', 
        PaymentView.as_view(), name='payments'),
    path('signin/', signin, name='signin'),
    path('signup/', register, name='signup'),
    path('aboutus/', aboutus, name='aboutus'),

]
