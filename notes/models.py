from django.db import models
from django.contrib.auth.models import User
from divesites.models import Country, Destination, DiveSite
from django.core.exceptions import ValidationError
from django.db.models.signals import pre_save

# Create your models here.

class Note(models.Model):
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    # reference
    country = models.ForeignKey(Country, 
        on_delete=models.SET_NULL,
        null=True)
    destination = models.ForeignKey(Destination, 
        on_delete=models.SET_NULL,
        null=True)
    divesite = models.ForeignKey(DiveSite, 
        on_delete=models.SET_NULL,
        null=True)

    @property 
    def ref_type(self):
        if self.country != None: return 'country'
        if self.destination != None: return 'destination'
        if self.divesite != None: return 'divesite'

    @property
    def ref_id(self):
        if self.country: return self.country.id
        if self.destination: return self.destination.id
        if self.divesite: return self.divesite.id

    def clean(self):
        count = 0
        if self.country is not None: count += 1
        if self.destination is not None: count += 1
        if self.divesite is not None: count += 1
        
        if count > 1:
            raise ValidationError('Note can only belong to one of the following (Country, Destination, DiveSite)')
