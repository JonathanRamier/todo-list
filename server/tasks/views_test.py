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

    def test_create_task(self):
        data = {"name": "Acheter T.O.K"}
        response = self.client.post('/tasks', data=data, format='json')
        self.assertEqual(response.data.get('name'), 'Acheter T.O.K')

    def test_update_task(self):
        data = {"id": 1, "name": "Vendre la voiture", "status": False}
        response = self.client.put('/tasks/1', data=data, format='json')
        self.assertEqual(len(response.data), 5)
        print(response.content)
        self.assertContains(response, "Vendre la voiture")

    def test_remove_task(self):
        response = self.client.delete('/tasks/1', format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_update_list_tasks(self):
        data = [
            {"id": 1, "name": "Vendre la voiture", "status": False},
            {"id": 3, "name": "Acheter fifa 2018", "status": True},
        ]

        # saving serializer
        response = self.client.post('/tasks/save', data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        tasks = Tasks.objects.all()
        self.assertEqual(tasks.count(), 2)
        task = tasks.get(name='Acheter fifa 2018')
        self.assertEqual(task.status, True, "status is not done")
        self.assertIsNotNone(task.updated_at, "update date is not set")
        self.assertIsNotNone(task.created_at, "update date is not set")
