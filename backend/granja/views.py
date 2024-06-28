from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Area, TipoCultivo, Enfermedades, Tratamientos, Cultivo, Vehiculos, Animales, CultivoEnfermedad
from .serializers import (AreaSerializer, TipoCultivoSerializer, EnfermedadesSerializer, TratamientosSerializer,
                          CultivoSerializer, VehiculosSerializer, AnimalesSerializer, CultivoEnfermedadSerializer)

class AreaViewSet(viewsets.ModelViewSet):
    queryset = Area.objects.all()
    serializer_class = AreaSerializer

class TipoCultivoViewSet(viewsets.ModelViewSet):
    queryset = TipoCultivo.objects.all()
    serializer_class = TipoCultivoSerializer

class EnfermedadesViewSet(viewsets.ModelViewSet):
    queryset = Enfermedades.objects.all().select_related('type_crops')
    serializer_class = EnfermedadesSerializer

class TratamientosViewSet(viewsets.ModelViewSet):
    queryset = Tratamientos.objects.all().select_related('disease')
    serializer_class = TratamientosSerializer

class CultivoViewSet(viewsets.ModelViewSet):
    queryset = Cultivo.objects.all().select_related('type', 'area').prefetch_related('disease')
    serializer_class = CultivoSerializer

    @action(detail=False, methods=['get'])
    def by_area(self, request):
        try:
            area_id = request.query_params.get('area_id')
            if area_id is not None:
                cultivos = Cultivo.objects.filter(area_id=area_id).select_related('type', 'area').prefetch_related('disease')
                serializer = self.get_serializer(cultivos, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response({"detail": "area_id is required"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class VehiculosViewSet(viewsets.ModelViewSet):
    queryset = Vehiculos.objects.all().select_related('manager', 'area')
    serializer_class = VehiculosSerializer

class AnimalesViewSet(viewsets.ModelViewSet):
    queryset = Animales.objects.all().select_related('manager', 'area')
    serializer_class = AnimalesSerializer

class CultivoEnfermedadViewSet(viewsets.ModelViewSet):
    queryset = CultivoEnfermedad.objects.all().select_related('manager', 'treatment', 'disease', 'crop')
    serializer_class = CultivoEnfermedadSerializer

    @action(detail=False, methods=['get'])
    def treatments_and_crops(self, request):
        try:
            area_id = request.query_params.get('area_id')
            disease_id = request.query_params.get('disease_id')
            if area_id and disease_id:
                cultivos = Cultivo.objects.filter(area_id=area_id).select_related('type', 'area').prefetch_related('disease')
                tratamientos = Tratamientos.objects.filter(disease_id=disease_id).select_related('disease')
                cultivo_serializer = CultivoSerializer(cultivos, many=True)
                tratamiento_serializer = TratamientosSerializer(tratamientos, many=True)
                return Response({
                    'cultivos': cultivo_serializer.data,
                    'tratamientos': tratamiento_serializer.data
                }, status=status.HTTP_200_OK)
            return Response({"detail": "area_id and disease_id are required"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
