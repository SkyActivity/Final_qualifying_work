from django.contrib import admin
from django.urls import path
from dataapp import views

urlpatterns = [
    path('export/csv/', views.export_map_data_csv, name='export_map_data_csv'),
    path('upload/chart/', views.upload_chart_data, name='upload_chart_data'),
    path('upload/data/', views.upload_combined_data, name='upload_combined_data'),
    path('upload/map/', views.upload_map_data, name='upload_map_data'),
    path('upload/students/', views.upload_students_data, name='upload_students_data'),
    path('clear-database/', views.clear_database, name='clear_database'),
    path('map/', views.display_map, name='map'),
    path('chart/', views.display_chart, name='chart'),
    path('analytics/years/', views.analytics_years, name='analytics_years'),
    path('analytics/directions/', views.analytics_directions, name='analytics_directions'),
    path('analytics/regions/', views.analytics_regions, name='analytics_regions'),
    path('analytics/students/', views.analytics_students, name='analytics_students'),
]
