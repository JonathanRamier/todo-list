from django.shortcuts import render


def index(request):
    return render(request, template_name='client/index.html',
                  context={'state': {'user': {'username': request.user.username,
                                              'isAuthenticated': request.user.is_authenticated()}}})
