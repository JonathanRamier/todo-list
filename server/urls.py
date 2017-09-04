from django.conf.urls import include, url
from .core import views
from .apiv1 import urls as apiv1_urls

urlpatterns = [
    url(r'^api/v1/', include(apiv1_urls)),
    url(r'^', views.index, name='index'),
]
