
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from empresa.views import *
from usuario.views import UserView, LogoutView


router = DefaultRouter()
router.register(prefix='areas', viewset=AreaViewSet, basename="area")
router.register(prefix='incidencia', viewset=IncidenciaViewSet, basename="incidencia")
router.register(prefix='areacultivo', viewset=AreaCultivoViewSet, basename="areacultivo")
router.register(prefix='trabajadores', viewset=TrabajadorViewSet, basename="trabajadores")
router.register(prefix='agricola', viewset=AgricolaViewSet, basename="agricola")
router.register(prefix='oficina', viewset=OficinaViewSet, basename="oficina")
router.register(prefix='tipo_cultivos', viewset=TipoCultivoViewSet, basename="tipo_cultivo")
router.register(prefix='tipo_flota', viewset=TipoFlotaViewSet, basename="tipo_flota")
router.register(prefix='enfermedades', viewset=EnfermedadesViewSet, basename="enfermedades")
router.register(prefix='tratamientos', viewset=TratamientosViewSet, basename="tratamientos")
router.register(prefix='cultivos', viewset=CultivoViewSet, basename="cultivos")
router.register(prefix='cultivo_enfermedad', viewset=CultivoEnfermedadViewSet, basename="cultivo_enfermedad")

router.register(prefix='Flota', viewset=FlotaViewSet, basename="Flota")
router.register(prefix='user', viewset=UserView, basename='user')
router.register(prefix='token/logout', viewset=LogoutView, basename='logout_view')





app_name = 'api'
urlpatterns = [
    path('api/', include(router.urls)),
    path('api/token/login/', TokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    ## endpoint trabajador
]