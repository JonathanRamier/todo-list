from django.conf.urls import url, include
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token

from tasks.views import TaskViewSets
from user.views import UserViewSets
from .core import views

from rest_framework import routers

router = routers.SimpleRouter(trailing_slash=False)

router.register(r'tasks', TaskViewSets, base_name='task_view')
router.register(r'users', UserViewSets, base_name='user_view')

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^', include(router.urls)),
    url(r'^oauth/token', obtain_jwt_token),
]
