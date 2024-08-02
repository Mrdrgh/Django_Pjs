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
    return redirect('home')

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

def records_view(req, id):
    """the records view"""
    if req.user.is_authenticated :
        record = records.objects.get(id=id)
        return render(req, "record.html", {"record": record})
    else:
        return redirect('home')

def modify_record(req, id):
    """the view to modify a record
    Args:
        id: the id of the record"""
    if req.user.is_authenticated:
        record = records.objects.get(id=id)
        if record.first_name == req.POST.get("first_name") and\
            record.last_name == req.POST.get("last_name") and\
            record.email == req.POST.get("email") and\
            record.phone == req.POST.get("phone") and\
            record.address == req.POST.get("adress") and\
            record.city == req.POST.get("city") and\
            record.state == req.POST.get("state") and\
            record.zipcode == req.POST.get("zipcode"):
            messages.success(req, "you must change a field")
            return redirect("records", id=id)
        else:
            record.first_name = req.POST.get("first_name")
            record.last_name = req.POST.get("last_name")
            record.email = req.POST.get("email")
            record.phone = req.POST.get("phone")
            record.address = req.POST.get("adress")
            record.city = req.POST.get("city")
            record.state = req.POST.get("state")
            record.zipcode = req.POST.get("zipcode")

        record.save()
        messages.success(req, "record edited succesfully")
        return redirect("records", id=id)

def delete_record(req, id):
    if req.user.is_authenticated:
        record = records.objects.get(id=id)
        record.delete()
        messages.success(req, "succesfully deleted")
        return redirect('home')


def add_record(req):
    """the view to add a record"""
    if req.user.is_authenticated:
        if req.method == "POST":
            first_name = req.POST.get("first_name")
            last_name = req.POST.get("last_name")
            email = req.POST.get("email")
            phone = req.POST.get("phone")
            address = req.POST.get("adress")
            city = req.POST.get("city")
            state = req.POST.get("state")
            zipcode = req.POST.get("zipcode")

            new_record = records(
                first_name=first_name,
                last_name=last_name,
                email=email,
                phone=phone,
                address=address,
                city=city,
                state=state,
                zipcode=zipcode,
            )
            new_record.save()
            return redirect("home")
        else:
            return render(req, 'add_record.html')




