from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.models import User
from rest_framework import status, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import UserSerializer


@api_view(['POST', ])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user is not None:
        # the password verified for the user
        if user.is_active:
            login(request, user)
            return Response(data='login succeed')

    return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET', ])
def logout_user(request):
    logout(request)
    return Response(status=status.HTTP_200_OK)


class UserViewSets(viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = []
    authentication_classes = []

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
