from django.urls import path, include
from . import views

urlpatterns = [
    path('notes/', views.NoteListCreate.as_view(), name="create_note_list"),
    path('notes/delete/<int:pk>/', views.NoteDelete.as_view(), name="delete_note_list"),
]