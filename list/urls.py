from django.contrib import admin
from django.urls import path, include
from list import *
from .views import *

urlpatterns = [
    path('task-create/', TaskView.as_view(), name='task-create'),
    path('task-list/', TaskView.as_view(), name='task-list'),
]