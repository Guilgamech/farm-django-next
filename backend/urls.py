
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from granja.views import (AreaViewSet, TipoCultivoViewSet, EnfermedadesViewSet, TratamientosViewSet, CultivoViewSet, VehiculosViewSet, 
                    AnimalesViewSet, CultivoEnfermedadViewSet)
from usuario.views import UserView, LogoutView


router = DefaultRouter()
router.register(prefix='areas', viewset=AreaViewSet, basename="area")
router.register(prefix='tipo_cultivos', viewset=TipoCultivoViewSet, basename="tipo_cultivo")
router.register(prefix='enfermedades', viewset=EnfermedadesViewSet, basename="enfermedades")
router.register(prefix='tratamientos', viewset=TratamientosViewSet, basename="tratamientos")
router.register(prefix='cultivos', viewset=CultivoViewSet, basename="cultivos")
router.register(prefix='vehiculos', viewset=VehiculosViewSet, basename="vehiculos")
router.register(prefix='animales', viewset=AnimalesViewSet, basename="animales")
router.register(prefix='cultivo_enfermedades', viewset=CultivoEnfermedadViewSet, basename="cultivo_enfermedades")
router.register(prefix='user', viewset=UserView, basename='user')
router.register(prefix='token/logout', viewset=LogoutView, basename='logout_view')





app_name = 'api'
urlpatterns = [
    path('api/', include(router.urls)),
    path('api/token/login/', TokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]