from django.contrib.auth.models import User
from divelogs.models import DiveLog
from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework import serializers
from rest_framework.permissions import IsAuthenticated

class DynamicResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 200

class DiveLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiveLog
        fields = '__all__'

class DiveLogViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = DiveLog.objects.all().order_by('-updated_at')
    serializer_class = DiveLogSerializer
    pagination_class = DynamicResultsSetPagination

    def get_permissions(self):
        return [IsAuthenticated()]


