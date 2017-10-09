from django.test import TestCase

from server.tasks.models import Tasks


class TaskModelTestCase(TestCase):
    fixtures = [
        'users_data.yaml',
        'tasks_data.yaml'
    ]

    def setUp(self):
        self.tasks = Tasks.objects.all()

    def test_get_task(self):
        self.assertEqual(self.tasks.count(), 3)
        self.assertEqual(self.tasks.first().name, "Faire les courses")

    def test_create_task(self):
        Tasks.objects.create(name="Ecrire des tests", priority=2, author_id=1)
        tasks = Tasks.objects.all()
        self.assertEqual(tasks.count(), 4)
        task = tasks.get(name='Ecrire des tests')
        self.assertEqual(task.priority, 2, "priority is not 2")
        self.assertEqual(task.status, False, "status is not done")
        self.assertIsNotNone(task.updated_at, "update date is not set")
        self.assertIsNotNone(task.created_at, "update date is not set")

    def test_get_second_task(self):
        second_task = self.tasks.get(pk=2)
        self.assertEqual(second_task.name, "Faire les courses")
        self.assertTrue(self.tasks.first().name, )

    def test_update_task(self):
        self.assertEqual(self.tasks.count(), 3)
        last_task = self.tasks.last()
        last_task.name = "Acheter une PS4 avec Fifa 18"
        updated_date = last_task.updated_at
        created_date = last_task.created_at
        last_task.save()
        tasks = Tasks.objects.all()
        self.assertEqual(tasks.count(), 3)
        last_task = tasks.last()
        self.assertEqual(last_task.name, "Acheter une PS4 avec Fifa 18")
        self.assertNotEqual(updated_date, last_task.updated_at, "the updated date not be same")
        self.assertEqual(created_date, last_task.created_at, "the creation date must be same")

    def test_remove_task(self):
        self.tasks.first().delete()
        self.assertEqual(self.tasks.count(), 2)
