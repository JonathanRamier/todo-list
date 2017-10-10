from rest_framework import status, viewsets, mixins
from rest_framework.decorators import list_route
from rest_framework.response import Response
from .models import Tasks

from .serializers import TaskSerializer


class TaskViewSets(viewsets.GenericViewSet,
                   mixins.ListModelMixin,
                   mixins.DestroyModelMixin,
                   mixins.UpdateModelMixin):

    queryset = Tasks.objects.all()
    serializer_class = TaskSerializer

    def get(self, request, *args, **kwargs):
        """
        List all tasks
        """
        return self.list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        """
        update all tasks
        """
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(author=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

    @list_route(methods=['POST'])
    def save(self, request, *args, **kwargs):
        tasks = self.queryset.filter(author=request.user)
        serializer = self.serializer_class(tasks, data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save(author=request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
