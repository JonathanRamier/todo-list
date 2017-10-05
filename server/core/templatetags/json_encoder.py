import json
from django import template

# Get template.Library instance
register = template.Library()


def default_json(obj):
    if hasattr(obj, 'isoformat'):
        return obj.isoformat()
    return obj


@register.filter('json')
def dump_json(data):
    return json.dumps(data, default=default_json)
