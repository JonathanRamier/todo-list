from django.utils.text import slugify
from rest_framework import serializers

from tasks.models import Tasks


class ListTaskSerializer(serializers.ListSerializer):
    def update(self, instance, validated_data):
        task_mapping = {slugify(task.name): task for task in instance}
        data_mapping = {slugify(item['name']): item for item in validated_data}

        ret = []
        for task_id, data in data_mapping.items():
            task = task_mapping.get(task_id, None)
            if task is None:
                ret.append(self.child.create(data))
            else:
                ret.append(self.child.update(task, data))

        for task_id, task in task_mapping.items():
            if task_id not in data_mapping:
                task.delete()

        return ret


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        list_serializer_class = ListTaskSerializer
        exclude = ['author']
        read_only_fields = ["created_date", "updated_date"]
