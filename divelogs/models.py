from django.db import models
from divesites.models import DiveSite
from django.contrib.postgres.fields import JSONField
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import User
from datetime import date
# from django.utils import timezone

# Create your models here.

class DiveLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    divesite = models.ForeignKey(DiveSite, on_delete=models.SET_DEFAULT, default=1)

    date = models.DateField()
    time = models.TimeField(null=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(blank=True)
    meta = JSONField(null=True)
    rating = models.FloatField(
        validators=[MinValueValidator(0), MaxValueValidator(5)],
        null=True
    )
