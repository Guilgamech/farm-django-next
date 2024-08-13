from rest_framework import viewsets, permissions, status, views, mixins, generics

from rest_framework.exceptions import ValidationError
from rest_framework.decorators import action
from rest_framework.response import Response
from helpers.helper import *
from .models import *
from .serializers import *

from rest_framework.views import APIView


class AreaViewSet(viewsets.ModelViewSet):
    queryset = Area.objects.all()
    serializer_class = AreaSerializer
    permission_classes = [permissions.IsAuthenticated]



class TipoCultivoViewSet(viewsets.ModelViewSet):
    queryset = TipoCultivo.objects.all()
    serializer_class = TipoCultivoSerializer
    permission_classes = [permissions.IsAuthenticated]
    
class TipoFlotaViewSet(viewsets.ModelViewSet):
    queryset = TipoFlota.objects.all()
    serializer_class = TipoFlotaSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    
#### Trabajador Generic View 

class TrabajadorViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Trabajador.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return TrabajadorReadSerializer
        return TrabajadorSerializer
    
####
    
class AgricolaViewSet(NestedViewSetMixin):
    queryset = Agricola.objects.all()
    serializer_class = AgricolaSerializer
    read_serializer_class = AgricolaReadSerializer
    permission_classes = [permissions.IsAuthenticated]
    
class OficinaViewSet(NestedViewSetMixin):
    queryset = Oficina.objects.all()
    serializer_class = OficinaSerializer
    read_serializer_class = OficinaReadSerializer
    permission_classes = [permissions.IsAuthenticated]
    
class IncidenciasViewSet(NestedViewSetMixin):
    queryset = Incidencias.objects.all()
    serializer_class = IncidenciasSerializer
    read_serializer_class = IncidenciasReadSerializer
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

class CultivoEnfermedadViewSet(NestedViewSetMixin):
    queryset = CultivoEnfermedad.objects.all()
    serializer_class = CultivoEnfermedadSerializer
    read_serializer_class = CultivoEnfermedadReadSerializer
    permission_classes = [permissions.IsAuthenticated]

class AreaCultivoViewSet(NestedViewSetMixin):
    queryset = AreaCultivo.objects.all()
    serializer_class = AreaCultivoSerializer
    read_serializer_class = AreaCultivoReadSerializer
    permission_classes = [permissions.IsAuthenticated]
    
class AgricolaCultivoViewSet(NestedViewSetMixin):
    queryset = AgricolaCultivo.objects.all()
    serializer_class = AgricolaCultivoSerializer
    read_serializer_class = AgricolaCultivoReadSerializer
    permission_classes = [permissions.IsAuthenticated]