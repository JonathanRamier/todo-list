from django.contrib.auth.models import User
from django.test import TestCase

from user.serializers import UserSerializer


class TaskSerializerTestCase(TestCase):
    fixtures = [
        'users_data.yaml',
    ]

    def setUp(self):
        self.queryset = User.objects.all()
        self.serializer_class = UserSerializer

    def test_serializer_list(self):
        serializer = self.serializer_class(self.queryset, many=True)
        self.assertEqual(len(serializer.data), 1)
        self.assertEqual(serializer.data[0]['email'], "jramier@gmail.fr")
        self.assertEqual(serializer.data[0]['first_name'], "Jonathan")
        self.assertEqual(serializer.data[0]['last_name'], "RAMIER")

    def test_serializer_create_user(self):
        data = {
            "first_name": "Dare",
            "last_name": "Devil",
            "email": "daredevil@marvel.com",
            "password": "azerty"
        }

        # saving serializer
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        users = User.objects.all()
        self.assertEqual(users.count(), 2)
        user = users.get(email="daredevil@marvel.com")
        self.assertEqual(user.first_name, 'Dare', "priority is not 2")
        self.assertEqual(user.last_name, 'Devil', "last_name is not done")
        self.assertIsNotNone(user.password, "password is not set")
