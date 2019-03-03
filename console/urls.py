from django.urls import path, re_path, include

from . import views

#app_name = 'console'

urlpatterns = [
    path('', views.index),
    path('login/', views.login),
    path('script/save/', views.save)
]