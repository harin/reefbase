from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User, Group
from divesites.models import Country, City, DiveSite
from rest_framework import viewsets
from divesites.serializers import (
    UserSerializer, GroupSerializer, CountrySerializer, 
    CitySerializer, DiveSiteSerializer,
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

class CityViewSet(viewsets.ModelViewSet):
    serializer_class = CitySerializer

    def get_queryset(self):
        queryset = City.objects.all()
        country_name = self.request.query_params.get('country', None)
        if country_name is not None:
            country = Country.objects.get(name=country_name)
            queryset = queryset.filter(country=country.id)
        return queryset

class DiveSiteViewSet(viewsets.ModelViewSet):
    queryset = DiveSite.objects.all()
    serializer_class = DiveSiteSerializer
    