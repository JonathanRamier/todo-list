from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)

    def update(self, instance, validated_data):
        raise NotImplemented

    def create(self, validated_data):
        username = '%s%s' % (validated_data.get(
            'first_name'), validated_data.get('last_name'))
        user = User.objects.create_user(
            username=username,
            **validated_data
        )

        return user
