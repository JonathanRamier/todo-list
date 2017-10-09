from rest_framework import status
from rest_framework.test import APITestCase


class TestIndexView(APITestCase):
    def test_get(self):
        resp = self.client.get('/')
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
