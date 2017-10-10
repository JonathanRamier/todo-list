from django.conf.urls import include, url
from rest_framework import routers
from .tasks.views import TaskViewSets

from .user.views import UserViewSets, login_user, logout_user
from .core import views

router = routers.SimpleRouter(trailing_slash=False)

router.register(r'tasks', TaskViewSets, base_name='task_view')
router.register(r'users', UserViewSets, base_name='user_view')

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^', include(router.urls)),
    url(r'^login$', login_user),
    url(r'^logout$', logout_user),
]
