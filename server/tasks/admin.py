from django.contrib import admin

from server.tasks.models import Tasks


@admin.register(Tasks)
class TaskAdmin(admin.ModelAdmin):
    fields = ['name', 'status', 'priority']
    date_hierarchy = 'updated_at'
