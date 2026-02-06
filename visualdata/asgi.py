"""
ASGI config for visualdata project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
"""

import os
# Описывает, как сервер должен передавать запросы, а приложение — на них отвечать
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'visualdata.settings')

application = get_asgi_application()
