from django.conf.urls import url, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from divesites import views as divesites_views
from notes import views as notes_views

router = routers.DefaultRouter()
router.register(r'users', divesites_views.UserViewSet)
router.register(r'groups', divesites_views.GroupViewSet)
router.register(r'countries', divesites_views.CountryViewSet)
router.register(r'cities', divesites_views.CityViewSet, basename='city')
router.register(r'divesites', divesites_views.DiveSiteViewSet)
router.register(r'notes', notes_views.NoteViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url('', include('frontend.urls')),
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
