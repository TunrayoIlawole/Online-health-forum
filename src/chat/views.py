from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.utils.safestring import mark_safe
from django.contrib import messages
import json
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login
from django.views.generic import ListView, DetailView, View
from django.conf import settings
from .models import Payment
from django.http import HttpResponse

import stripe
stripe.api_key = "sk_test_4eC39HqLyjWDarjtT1zdp7dc"

def index(request):
    return render(request, 'chat/index.html', {})


def home(request):
    return render(request, 'index.html', {} )

def aboutus(request):
    return render(request, 'aboutus.html', {})

def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)

        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=password)
            login(request, user)
            return redirect('symptoms')

        else:
            return redirect('signup')
    else:
        form = UserCreationForm()

    context = {'form': form}
    return render(request, 'registration/signup.html',context )

def signin(request):
    return render(request, 'registration/login.html', {})

def payments(request):
    return render(request, 'payments.html', {})

@login_required
def room(request, room_name):
    return render(request, 'chat/room.html', {
        'room_name_json': mark_safe(json.dumps(room_name)),
        'username': mark_safe(json.dumps(request.user.username)),
    })

def symptoms(request):
    return render(request, "symptoms.html", {})

class PaymentView(View):
    def get(self, *args, **kwargs):
        return render(self.request, "payments.html")

    def post(self, *args, **kwargs):
        token = self.request.POST.get('stripeToken')
        try:
            # Use Stripe's library to make requests...

            charge = stripe.Charge.create(
                amount=int(2000*100),
                currency="NGN",
                source=token,  # obtained with stripe.js
            )

            # create payment
            payment = Payment()
            payment.stripe_charge_id = charge['id']
            payment.user = self.request.user
            payment.amount = int(2000*100)
            payment.save()

            # assign the payment to the order

            messages.success(self.request, "Your order was successful")
            return redirect("http://127.0.0.1:8000/chat/Dr.Owenswiwa")

        except stripe.error.CardError as e:
            # Since it's a decline, stripe.error.CardError will be caught
            messages.error(self.request, "Transaction failed")
            return redirect("/")
        except stripe.error.RateLimitError as e:
            # Too many requests made to the API too quickly
            messages.error(self.request, "Rate limit error")
            return redirect("/")
        except stripe.error.InvalidRequestError as e:
            # Invalid parameters were supplied to Stripe's API
            messages.error(self.request, "Invalid parameters")
            return redirect("/")
        except stripe.error.AuthenticationError as e:
            # Authentication with Stripe's API failed
            # (maybe you changed API keys recently)
            messages.error(self.request, "Not authenticated")
            return redirect("/")
        except stripe.error.APIConnectionError as e:
            # Network communication with Stripe failed
            messages.error(self.request, "Network Error")
            return redirect("/")
        except stripe.error.StripeError as e:
            # Display a very generic error to the user, and maybe send
            # yourself an email
            messages.error(
                self.request, "Something went wrong, You were not charged. Please try again")
            return redirect("/")
        except Exception as e:
            # Something else happened, completely unrelated to Stripe
            # send an email to ourselves
            messages.error(
                self.request, "A serious error has occurred and we have been notified about it!")
            return redirect("/")
