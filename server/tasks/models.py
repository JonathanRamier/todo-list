from django.contrib.auth.models import User
from django.db import models


class Tasks(models.Model):
    """
    Model tasks
    """

    name = models.CharField(max_length=200, null=False,
                            blank=False, verbose_name="task name")
    status = models.BooleanField(default=False, verbose_name="status task")
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name="created task")
    updated_at = models.DateTimeField(
        auto_now=True, verbose_name="updated task")
    author = models.ForeignKey(User, related_name='user')

    class Meta:
        db_table = "pm_task"
        ordering = ["created_at"]
