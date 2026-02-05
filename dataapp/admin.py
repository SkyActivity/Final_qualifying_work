from django.contrib import admin
from .models import ApplicantMapRecord, ApplicantRecord, StudentRecord

# Register your models here.
@admin.register(ApplicantMapRecord)
class ApplicantMap(admin.ModelAdmin):
    list_display = ('city', 'region', 'code', 'lat', 'lon', 'count')
    search_fields = ('city', 'region', 'code')

@admin.register(ApplicantRecord)
class Applicant(admin.ModelAdmin):
    list_display = ('id','code', 'specialty', 'education_level', 'learning_form', 'total_students', 'budget_rf', 'paid_students', 'average_score', 'year')
    search_fields = ('code', 'specialty', 'education_level')

@admin.register(StudentRecord)
class Student(admin.ModelAdmin):
    list_display = ('fio', 'gender', 'age', 'city', 'region', 'specialty_code', 'specialty', 'learning_form', 'education_level')
    search_fields = ('fio', 'specialty', 'specialty_code', 'city', 'region')