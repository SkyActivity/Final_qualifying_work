from django.db import models
# Определяют структуру базы данных
class ApplicantRecord(models.Model):
    code = models.TextField()
    specialty = models.CharField(max_length=255)
    education_level = models.CharField(max_length=255)
    learning_form = models.CharField(max_length=255)
    total_students = models.IntegerField(null=True, blank=True, default=0)
    budget_rf = models.IntegerField(null=True, blank=True, default=0)
    paid_students = models.IntegerField(null=True, blank=True, default=0)
    average_score = models.IntegerField(null=True, blank=True, default=0)
    year = models.IntegerField(null=True, blank=True, default=2024, help_text='Год поступления')

    class Meta:
        ordering = ['-year', 'specialty']

    def __str__(self):
        return f'{self.specialty}, {self.education_level}, {self.learning_form} ({self.year})'

class ApplicantMapRecord(models.Model):
    region = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    count = models.IntegerField()
    lat = models.FloatField(default=0.0)
    lon = models.FloatField(default=0.0)
    code = models.CharField(max_length=255)

    def __str__(self):
        return f'{self.region}, {self.city}, {self.count}'

class StudentRecord(models.Model):
    fio = models.CharField(max_length=255)
    gender = models.CharField(max_length=10)
    age = models.IntegerField()
    birth_date = models.DateField()
    city = models.CharField(max_length=255)
    region = models.CharField(max_length=255)
    math_score = models.FloatField()
    russian_score = models.FloatField()
    profile_subject = models.CharField(max_length=255)
    profile_score = models.FloatField()
    avg_score = models.FloatField()
    specialty_code = models.CharField(max_length=255)
    specialty = models.CharField(max_length=255)
    learning_form = models.CharField(max_length=255)
    education_level = models.CharField(max_length=255)
    passing_score = models.FloatField()
    year = models.IntegerField(null=True, blank=True, help_text='Год поступления')

    class Meta:
        ordering = ['specialty', 'fio']

    def __str__(self):
        return f'{self.fio} ({self.specialty_code})'
