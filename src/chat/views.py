from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.utils.safestring import mark_safe
import json

def index(request):
    return render(request, 'chat/index.html', {})


def home(request):
    return render(request, 'index.html', {} )

def aboutus(request):
    return render(request, 'aboutus.html', {})

def signin(request):
    return render(request, 'signin.html', {})

def signup(request):
    return render(request, 'signup.html', {})

def payments(request):
    return render(request, 'payments.html', {})

def room(request, room_name):
    return render(request, 'chat/room.html', {
        'room_name_json': mark_safe(json.dumps(room_name)),
        'username': mark_safe(json.dumps(request.user.username)),
    })

def symptoms(request):
    return render(request, "symptoms.html", {})