from django.contrib.auth.models import User
from divelogs.models import DiveLog
from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework import serializers, status
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

class DynamicResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 200

class DiveLogSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField()
    divesite_id = serializers.IntegerField()
    class Meta:
        model = DiveLog
        fields = ('id', 'date', 'time', 'updated_at', 'created_at',
                    'notes','meta','rating', 'user_id',
                    'divesite', 'divesite_id' )
        depth = 3

class DiveLogViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = DiveLog.objects.all().order_by('-updated_at')
    serializer_class = DiveLogSerializer
    pagination_class = DynamicResultsSetPagination
    authentication_classes = (SessionAuthentication,)
    permission_classes = (IsAuthenticated,)

    def list(self, request):
        queryset = self.get_queryset().filter(user_id=request.user.id)
        serializer = DiveLogSerializer(queryset, many=True)
        return Response({
            'results': serializer.data
        })

    def create(self, request):
        data = request.data
        data['user_id'] = request.user.id
        serializer = DiveLogSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


