from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
# Create your views here.

def home(req):
    if req.method == "POST":
        email = req.POST["email"]
        password = req.POST["password"]
        user  = authenticate(req, username=email, password=password)
        if user is not None:
            login(req, user=user)
            return redirect('home')
        else:
            messages.success(req, "oops, wrong credentials !")
            return redirect('home')
    else:
        return render(req, "home.html", {})

def login_user(req):
    ...

def logout_user(req):
    logout(req)
    messages.success(req, "Logged out")
    return render(req, "home.html")


