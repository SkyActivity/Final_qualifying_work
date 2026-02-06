"""
Django settings for visualdata project.
"""

from pathlib import Path

# ОСНОВНАЯ ДИРЕКТОРИЯ ПРОЕКТА
BASE_DIR = Path(__file__).resolve().parent.parent  # Корневая папка проекта

# ================= БЕЗОПАСНОСТЬ =================
SECRET_KEY = 'django-insecure-...'  # Секретный ключ для шифрования (МЕНЯТЬ В ПРОДАКШЕН!)
DEBUG = True  # Режим отладки (True = показывать ошибки, False для продакшена)
ALLOWED_HOSTS = []  # С каких доменов можно заходить (пусто = с любых)

# ================= ПРИЛОЖЕНИЯ =================
INSTALLED_APPS = [
    'django.contrib.admin',     # Админ-панель
    'django.contrib.auth',      # Система авторизации
    'django.contrib.contenttypes',
    'django.contrib.sessions',  # Работа с сессиями
    'django.contrib.messages',  # Система сообщений
    'django.contrib.staticfiles', # Статические файлы (CSS, JS)
    'dataapp',                  # приложение с графиками
]

# ================= ПРОМЕЖУТОЧНОЕ ПО (MIDDLEWARE) =================
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',    # Защита
    'django.contrib.sessions.middleware.SessionMiddleware', # Сессии
    'django.middleware.common.CommonMiddleware',       # Общая логика
    'django.middleware.csrf.CsrfViewMiddleware',       # Защита от CSRF-атак
    'django.contrib.auth.middleware.AuthenticationMiddleware', # Авторизация
    'django.contrib.messages.middleware.MessageMiddleware', # Сообщения
    'django.middleware.clickjacking.XFrameOptionsMiddleware', # Защита от кликджекинга
]

# ================= URL И ШАБЛОНЫ =================
ROOT_URLCONF = 'visualdata.urls'  # Главный файл с маршрутами (urls.py)
WSGI_APPLICATION = 'visualdata.wsgi.application'  # WSGI-приложение

TEMPLATES = [  # Настройки шаблонов (HTML-файлов)
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',  # Движок
        'DIRS': [],              # Дополнительные папки с шаблонами
        'APP_DIRS': True,        # Искать шаблоны в папках приложений
        'OPTIONS': {
            'context_processors': [  # Обработчики контекста
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',     # Данные пользователя
                'django.contrib.messages.context_processors.messages', # Сообщения
            ],
        },
    },
]

# ================= БАЗА ДАННЫХ =================
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',  # Используем SQLite
        'NAME': BASE_DIR / 'db.sqlite3',         # Файл базы данных
    }
}

# ================= ПРОВЕРКА ПАРОЛЕЙ =================
AUTH_PASSWORD_VALIDATORS = [  # Валидаторы для проверки сложности паролей
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},  # Не похож на данные пользователя
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},  # Минимальная длина
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},  # Не распространённый пароль
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},  # Не только цифры
]

# ================= ЯЗЫК И ВРЕМЯ =================
LANGUAGE_CODE = 'en-us'  # Язык интерфейса (английский)
TIME_ZONE = 'UTC'        # Часовой пояс (Гринвич)
USE_I18N = True          # Включить интернационализацию
USE_TZ = True            # Использовать часовые пояса

# ================= СТАТИЧЕСКИЕ ФАЙЛЫ =================
STATIC_URL = 'static/'  # URL для статических файлов (CSS, JS, изображения)

# ================= ОСНОВНЫЕ НАСТРОЙКИ =================
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'  # Тип автоинкрементного поля
AUTHENTICATION_BACKENDS = ['django.contrib.auth.backends.ModelBackend']  # Способ авторизации
LOGIN_REDIRECT_URL = '/'   # Куда переходить после входа
LOGOUT_REDIRECT_URL = '/'  # Куда переходить после выхода