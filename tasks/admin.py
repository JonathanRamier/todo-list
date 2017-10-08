from django.contrib import admin

from tasks.models import Tasks


@admin.register(Tasks)
class TaskAdmin(admin.ModelAdmin):
    fields = ['name', 'status', 'priority']
    date_hierarchy = 'updated_at'
