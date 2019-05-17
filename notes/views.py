from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User, Group
from notes.models import Note
from rest_framework import viewsets
from notes.serializers import NoteSerializer

class NoteViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

