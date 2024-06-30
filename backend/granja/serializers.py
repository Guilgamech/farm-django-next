from rest_framework import serializers
from .models import *


class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = '__all__'


class AgricultoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agricultores
        fields = '__all__'


class TipoCultivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoCultivo
        fields = '__all__'


class TipoFlotaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoFlota
        fields = '__all__'


class EnfermedadesSerializer(serializers.ModelSerializer):
    type_crops = serializers.PrimaryKeyRelatedField(queryset=TipoCultivo.objects.all())

    class Meta:
        model = Enfermedades
        fields = '__all__'


class EnfermedadesReadSerializer(serializers.ModelSerializer):
    type_crops = TipoCultivoSerializer()

    class Meta:
        model = Enfermedades
        fields = '__all__'


class TratamientosSerializer(serializers.ModelSerializer):
    disease = serializers.PrimaryKeyRelatedField(queryset=Enfermedades.objects.all())

    class Meta:
        model = Tratamientos
        fields = '__all__'


class TratamientosReadSerializer(serializers.ModelSerializer):
    disease = EnfermedadesReadSerializer()

    class Meta:
        model = Tratamientos
        fields = '__all__'


class CultivoSerializer(serializers.ModelSerializer):
    type = serializers.PrimaryKeyRelatedField(queryset=TipoCultivo.objects.all())
    manager = serializers.PrimaryKeyRelatedField(queryset=Agricultores.objects.all())

    class Meta:
        model = Cultivo
        fields = ('code', 'name', 'date_planted', 'date_harved', 'status', 'type', 'manager')


class FlotaSerializer(serializers.ModelSerializer):
    type = serializers.PrimaryKeyRelatedField(queryset=TipoFlota.objects.all())
    manager = serializers.PrimaryKeyRelatedField(queryset=Agricultores.objects.all())
    area = serializers.PrimaryKeyRelatedField(queryset=Area.objects.all())

    class Meta:
        model = Flota
        fields = '__all__'


class FlotaReadSerializer(serializers.ModelSerializer):
    type = TipoFlotaSerializer()
    manager = AgricultoresSerializer()
    area = AreaSerializer()

    class Meta:
        model = Flota
        fields = '__all__'


class AnimalesSerializer(serializers.ModelSerializer):
    manager = serializers.PrimaryKeyRelatedField(queryset=Agricultores.objects.all())
    area = serializers.PrimaryKeyRelatedField(queryset=Area.objects.all())

    class Meta:
        model = Animales
        fields = '__all__'


class AnimalesReadSerializer(serializers.ModelSerializer):
    manager = AgricultoresSerializer()
    area = AreaSerializer()

    class Meta:
        model = Animales
        fields = '__all__'


class CultivoEnfermedadSerializer(serializers.ModelSerializer):
    manager = serializers.PrimaryKeyRelatedField(queryset=Agricultores.objects.all())
    treatment = serializers.PrimaryKeyRelatedField(queryset=Tratamientos.objects.all())
    disease = serializers.PrimaryKeyRelatedField(queryset=Enfermedades.objects.all())
    crop = serializers.PrimaryKeyRelatedField(queryset=Cultivo.objects.all())

    class Meta:
        model = CultivoEnfermedad
        fields = '__all__'


class CultivoEnfermedadReadSerializer(serializers.ModelSerializer):
    manager = AgricultoresSerializer()
    treatment = TratamientosReadSerializer()
    disease = EnfermedadesReadSerializer()

    class Meta:
        model = CultivoEnfermedad
        fields = ('disease', 'manager', 'treatment', 'start', 'end', 'grade')


class CultivoReadSerializer(serializers.ModelSerializer):
    type = TipoCultivoSerializer()
    manager = Agricultores()
    area = AreaSerializer(many=True)
    workers = AgricultoresSerializer(many=True)
    disease = CultivoEnfermedadReadSerializer(many=True)

    class Meta:
        model = Cultivo
        fields = '__all__'
