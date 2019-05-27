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
        country_name = self.request.query_params.get('country_name', None)
        if country_name is not None:
            country = Country.objects.get(name=country_name)
            queryset = queryset.filter(country=country.id)

        city_name = self.request.query_params.get('city_name', None)
        if city_name is not None:
            queryset = queryset.filter(name=city_name)

        # TODO: only populate relationship when this is true
        
        # include_divesites = self.request.query_params.get('include_divesites', None)
        # if include_divesites is not None:
        #     for city in queryset:
        #         print(city)

        return queryset


class DiveSiteViewSet(viewsets.ModelViewSet):
    serializer_class = DiveSiteSerializer
    
    def get_queryset(self):
        queryset = DiveSite.objects.all()
        country_name = self.request.query_params.get('country', None)
        city_name = self.request.query_params.get('city', None)

        if country_name is not None and city_name is not None:
            # TODO: use django relationship to filter instead of manually getting country
            # https://docs.djangoproject.com/en/2.2/topics/db/examples/many_to_one/
            country = Country.objects.get(name=country_name)
            city = City.objects.get(name=city_name, country_id = country.id)
            queryset = queryset.filter(city=city)
            
        return queryset
 