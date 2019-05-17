from django.contrib.auth.models import User, Group
from rest_framework import serializers
from notes.models import Note


class NoteSerializer(serializers.HyperlinkedModelSerializer):
    ref_type = serializers.Field()
    class Meta:
        model = Note
        fields = ('url', 'id', 'author', 'content', 
            'updated_at', 'created_at', 'ref_type', 'ref_id')
