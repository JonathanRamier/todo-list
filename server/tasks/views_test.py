from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase

from server.tasks.models import Tasks


class TaskViewTestCase(APITestCase):
    fixtures = [
        'users_data.yaml',
        'tasks_data.yaml'
    ]

    def setUp(self):
        self.user = User.objects.get(pk=1)
        self.client.force_login(self.user)

    def test_get_list_task(self):
        response = self.client.get('/tasks', format='json')
        self.assertEqual(len(response.data), 3)
        self.assertContains(response, "Faire les courses")

    def test_update_list_tasks(self):
        data = [
            {"id": 1, "name": "Vendre la voiture", "status": False, "priority": 1},
            {"id": 3, "name": "Acheter fifa 2018", "status": True, "priority": 2},
        ]

        # saving serializer
        response = self.client.post('/tasks', data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        tasks = Tasks.objects.all()
        self.assertEqual(tasks.count(), 2)
        task = tasks.get(name='Acheter fifa 2018')
        self.assertEqual(task.priority, 2, "priority is not 2")
        self.assertEqual(task.status, True, "status is not done")
        self.assertIsNotNone(task.updated_at, "update date is not set")
        self.assertIsNotNone(task.created_at, "update date is not set")

