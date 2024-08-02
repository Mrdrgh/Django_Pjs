from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('login/', views.login_user, name="login_user"),
    path('logout/', views.logout_user, name="logout_user"),
    path('register/', views.register_user, name="register_user"),
    path('record/<int:id>', views.records_view, name="records"),
    path('modify_record/<int:id>', views.modify_record, name="modify_record"),
    path('delete_record/<int:id>', views.delete_record, name="delete_record"),
    path('addRecord/', views.add_record, name="add_record"),
]
