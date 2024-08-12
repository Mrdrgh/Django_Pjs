from django.urls import path
from .views import BlogListCreate, BlogUpdate, BlogDelete, ProfileDetail, FriendshipLisstCreate
urlpatterns = [
    path('blogs/', BlogListCreate.as_view(), name='create_blog'),
    path('blogs/update/<int:pk>/', BlogUpdate.as_view(), name='update_blog'),
    path('blogs/delete/<int:pk>/', BlogDelete.as_view(), name='delete_blog'),
    path('profile/', ProfileDetail.as_view()),
    path('friendships/', FriendshipLisstCreate.as_view()),
]