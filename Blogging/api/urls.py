from django.urls import path
from .views import BlogListCreate, BlogUpdate, BlogDelete
urlpatterns = [
    path('Blogs/', BlogListCreate.as_view(), name='create_blog'),
    path('Blogs/update/<int:pk>/', BlogUpdate.as_view(), name='update_blog'),
    path('Blogs/delete/<int:pk>/', BlogDelete.as_view(), name='delete_blog'),
]