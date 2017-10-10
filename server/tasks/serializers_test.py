from django.test import TestCase
from .models import Tasks

from server.tasks.serializers import TaskSerializer


class TaskSerializerTestCase(TestCase):
    fixtures = [
        'users_data.yaml',
        'tasks_data.yaml'
    ]

    def setUp(self):
        self.queryset = Tasks.objects.all()
        self.serializer_class = TaskSerializer

    def test_serializer_list(self):
        serializer = self.serializer_class(self.queryset, many=True)
        self.assertEqual(len(serializer.data), 3)
        self.assertEqual(serializer.data[0]['name'], "Faire les courses")

    def test_serializer_create_task(self):
        data = {"name": "Aller nager", "status": False, "author_id": 1}

        # saving serializer
        serializer = self.serializer_class(data=data)
        serializer.is_valid()
        serializer.save(author_id=1)

        tasks = Tasks.objects.all()
        self.assertEqual(tasks.count(), 4)
        task = tasks.get(name='Aller nager')
        self.assertEqual(task.status, False, "status is not done")
        self.assertIsNotNone(task.updated_at, "update date is not set")
        self.assertIsNotNone(task.created_at, "update date is not set")

    def test_create_update_remove_list_task(self):
        data = [
            {"id": 1, "name": "Vendre la voiture", "status": False},
            {"id": 3, "name": "Acheter fifa 2018", "status": True},
        ]

        serializer = self.serializer_class(self.queryset, data=data, many=True)
        serializer.is_valid()
        serializer.save(author_id=1)

        tasks = Tasks.objects.all()
        self.assertEqual(tasks.count(), 2)
        self.assertEqual(len(serializer.data), 2)
        self.assertEqual(serializer.data[1]['name'], "Acheter fifa 2018")

    def test_get_second_task(self):
        serializer = self.serializer_class(self.queryset[1])
        self.assertEqual(serializer.data['id'], 3)
        self.assertFalse(serializer.data['status'])
        self.assertEqual(serializer.data['name'], "Jouer à fifa 2018")

    def test_update_task(self):
        data = {"id": 1, "name": "Acheter une PS4 avec Fifa 18",
                "status": False}

        task = Tasks.objects.get(pk=1)
        updated_date = task.updated_at
        created_date = task.created_at

        # saving serializer
        serializer = self.serializer_class(self.queryset.get(pk=1), data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save(author_id=1)

        tasks = Tasks.objects.all()
        self.assertEqual(tasks.count(), 3)
        task = tasks.get(pk=1)
        self.assertEqual(task.status, False, "status is not done")
        self.assertNotEqual(updated_date, task.updated_at,
                            "the updated date not be same")
        self.assertEqual(created_date, task.created_at,
                         "the creation date must be same")
