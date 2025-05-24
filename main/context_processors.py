
from django.conf import settings

def user_avatar(request):
    return {
        'default_avatar': 'res/default-avatar.jpg',
        'user_avatar': request.user.profile.profile_picture.url if request.user.is_authenticated and request.user.profile.profile_picture else settings.STATIC_URL + 'res/default-avatar.jpg'
    }