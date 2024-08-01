from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.models import User
from .models import records
# Create your views here.

def home(req):
    recs = records.objects.all()
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
        return render(req, "home.html", {'records': recs})

def login_user(req):
    ...

def logout_user(req):
    logout(req)
    messages.success(req, "Logged out")
    return render(req, "home.html")

def register_user(req):
    # new_user = User(username="")
    # messages.success(req, "Registration succesful")
    if req.method == "POST":
        username = req.POST.get("username")
        email = req.POST.get("email")
        password = req.POST.get("password")
        password_conf = req.POST.get("confirm_password")
        
        new_user = User(
            username=username,
            email=email,
        )
        if User.objects.filter(username=username).exists():
            messages.success(req, "user already exists")
            return render(req, "register.html")
        elif password_conf != password:
            messages.success(req, "password not confirmed correctly")
            return render(req, "register.html")
        else:
            new_user.set_password(raw_password=password)
            new_user.save()
            return redirect('home')
    else: 
        return render(req, "register.html")

