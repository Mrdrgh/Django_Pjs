from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
# Create your views here.

def home(req):
    if req.method == "POST":
        email = req.POST["email"]
        password = req.POST["password"]

        user  = authenticate(req, email=email, password=password)
        if user is not None:
            login(req, user=user)
            messages.success(req, "succesfully logged in") 
            return redirect('home')
        else:
            messages.success(req, "oops, wrong credentials !")
            return redirect('home')
    return render(req, "home.html", {})

def login_user(req):
    ...

def logout_user(req):
    ...


