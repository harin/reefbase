from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User, Group
from divesites.models import Country, Destination, DiveSite
from rest_framework import viewsets
from divesites.serializers import (
    UserSerializer, GroupSerializer, CountrySerializer, 
    DestinationSerializer, DiveSiteSerializer,
)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class CountryViewSet(viewsets.ModelViewSet):
    queryset = Country.objects.all()
    serializer_class =  CountrySerializer

class DestinationViewSet(viewsets.ModelViewSet):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer

class DiveSiteViewSet(viewsets.ModelViewSet):
    queryset = DiveSite.objects.all()
    serializer_class = DiveSiteSerializer
    