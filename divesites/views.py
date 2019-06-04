from django.shortcuts import render
from django.contrib.gis.geos import GEOSGeometry
from django.contrib.gis.measure import D
from django.contrib.gis.db.models.functions import Distance
from django.contrib.auth.models import User, Group
from django.contrib.postgres.search import SearchVector, SearchQuery, SearchRank
from django.db.models import Count, F
from divesites.models import Country, City, DiveSite
from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from divesites.serializers import (
    UserSerializer, GroupSerializer, CountrySerializer, 
    CitySerializer, DiveSiteSerializer,
)

class DynamicResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 200


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
    queryset = Country.objects.annotate(num_divesite=Count('city__divesite')).order_by('-num_divesite').all()
    serializer_class =  CountrySerializer
    pagination_class = DynamicResultsSetPagination


class CityViewSet(viewsets.ModelViewSet):
    serializer_class = CitySerializer
    pagination_class = DynamicResultsSetPagination

    def get_queryset(self):
        queryset = City.objects.annotate(num_divesite=Count('divesite')).order_by('-num_divesite').all()
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
    pagination_class = DynamicResultsSetPagination
    
    def get_queryset(self):
        query_params = self.request.query_params
        queryset = DiveSite.objects.all()
        country_name = query_params.get('country', None)
        city_name = query_params.get('city', None)

        if country_name is not None and city_name is not None:
            # TODO: use django relationship to filter instead of manually getting country
            # https://docs.djangoproject.com/en/2.2/topics/db/examples/many_to_one/
            country = Country.objects.get(name=country_name)
            city = City.objects.get(name=city_name, country_id = country.id)
            queryset = queryset.filter(city=city)

        lat = query_params.get('lat', None)
        lng = query_params.get('lng', None)
        radius = query_params.get('radius', None)
        if lat is not None and lng is not None and radius is not None:
            pnt = GEOSGeometry(f'POINT({lng} {lat})', srid=4326)
            queryset = queryset.filter(coord__distance_lte=(pnt, D(km=radius))) \
                                .annotate(distance=Distance('coord', pnt)).order_by('distance')
        
        include_location = query_params.get('include_location', None)
        if include_location is not None:
            queryset = queryset.annotate(country_name=F('city__country__name'))\
                               .annotate(city_name=F('city__name'))

        keyword = query_params.get('keyword', None)
        if keyword is not None:
            vector = SearchVector('name', 'city__name', 'city__country__name')
            query = SearchQuery(keyword)
            queryset = queryset.annotate(rank=SearchRank(vector, query)).order_by('-rank')

        return queryset
 