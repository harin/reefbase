from django.contrib.auth.models import User, Group
from divesites.models import Country, City, DiveSite
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')


class CountrySerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    num_divesite = serializers.IntegerField(required=False)
    num_city = serializers.IntegerField(required=False)
    class Meta:
        model = Country
        fields = '__all__'


class DiveSiteSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    country_name = serializers.ReadOnlyField(required=False)
    city_name = serializers.ReadOnlyField(required=False)
    class Meta:
        model = DiveSite
        fields = '__all__'


class CitySerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    divesite_set = DiveSiteSerializer(many=True, required=False)
    num_divesite = serializers.IntegerField(required=False)
    class Meta:
        model = City
        fields = '__all__'

