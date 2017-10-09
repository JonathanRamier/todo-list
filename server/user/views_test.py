from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase


class TaskViewTestCase(APITestCase):
    fixtures = [
        'users_data.yaml',
    ]

    def setUp(self):
        self.user = User.objects.get(pk=1)
        self.client.force_login(self.user)

    def test_create_user(self):
        data = {
            "email": "b@b.fr",
            "last_name": "man",
            "first_name": "buzz",
            "password": "azerty"
        }

        # saving serializer
        response = self.client.post('/users', data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        users = User.objects.all()
        self.assertEqual(users.count(), 2)
        user = users.get(email='b@b.fr')
        self.assertEqual(user.last_name, "man", "last_name is not 2")
        self.assertEqual(user.first_name, "buzz", "first_name is not done")
        self.assertIsNotNone(user.password, "password is not set")
