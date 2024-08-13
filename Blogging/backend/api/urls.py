from django.urls import path
from .views import BlogListCreate, BlogUpdate, BlogDelete, ProfileDetail, FriendshipListCreate, UserBlogsList
urlpatterns = [
    path('blogs/', BlogListCreate.as_view(), name='create_blog'),
    path('blogs/update/<int:pk>/', BlogUpdate.as_view(), name='update_blog'),
    path('blogs/delete/<int:pk>/', BlogDelete.as_view(), name='delete_blog'),
    path('profile/', ProfileDetail.as_view(), name='profile_detail'),
    path('user_blogs/', UserBlogsList.as_view(), name='user_blogs'),
    path('friendships/', FriendshipListCreate.as_view()),
]