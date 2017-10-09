from rest_framework import status, viewsets
from rest_framework.response import Response
from .models import Tasks

from .serializers import TaskSerializer


class TaskViewSets(viewsets.GenericViewSet):
    queryset = Tasks.objects.all()
    serializer_class = TaskSerializer

    def list(self, request, *args, **kwargs):
        """
        List all tasks
        """
        tasks = self.queryset.filter(author=request.user)
        serializer = self.serializer_class(tasks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        """
        update all tasks
        """
        tasks = self.queryset.filter(author=request.user)
        serializer = self.serializer_class(tasks, data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save(author=request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
