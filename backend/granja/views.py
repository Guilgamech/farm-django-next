from rest_framework import viewsets, permissions, status

from rest_framework.exceptions import ValidationError
from rest_framework.decorators import action
from rest_framework.response import Response
from helpers.helper import *
from .models import *
from .serializers import *
class AreaViewSet(viewsets.ModelViewSet):
    queryset = Area.objects.all()
    serializer_class = AreaSerializer
    permission_classes = [permissions.IsAuthenticated]
class AgricultoresViewSet(viewsets.ModelViewSet):
    queryset = Agricultores.objects.all()
    serializer_class = AgricultoresSerializer
    permission_classes = [permissions.IsAuthenticated]

class TipoCultivoViewSet(viewsets.ModelViewSet):
    queryset = TipoCultivo.objects.all()
    serializer_class = TipoCultivoSerializer
    permission_classes = [permissions.IsAuthenticated]
    
class TipoFlotaViewSet(viewsets.ModelViewSet):
    queryset = TipoFlota.objects.all()
    serializer_class = TipoFlotaSerializer
    permission_classes = [permissions.IsAuthenticated]

class EnfermedadesViewSet(NestedViewSetMixin):
    queryset = Enfermedades.objects.all()
    serializer_class = EnfermedadesSerializer
    read_serializer_class = EnfermedadesReadSerializer
    permission_classes = [permissions.IsAuthenticated]

class TratamientosViewSet(NestedViewSetMixin):
    queryset = Tratamientos.objects.all()
    serializer_class = TratamientosSerializer
    read_serializer_class = TratamientosReadSerializer
    permission_classes = [permissions.IsAuthenticated]

class CultivoViewSet(NestedViewSetMixin):
    queryset = Cultivo.objects.all()
    serializer_class = CultivoSerializer
    read_serializer_class = CultivoReadSerializer
    permission_classes = [permissions.IsAuthenticated]

class FlotaViewSet(NestedViewSetMixin):
    queryset = Flota.objects.all()
    serializer_class = FlotaSerializer
    read_serializer_class = FlotaReadSerializer
    permission_classes = [permissions.IsAuthenticated]

class AnimalesViewSet(NestedViewSetMixin):
    queryset = Animales.objects.all()
    serializer_class = AnimalesSerializer
    read_serializer_class = AnimalesReadSerializer
    permission_classes = [permissions.IsAuthenticated]
