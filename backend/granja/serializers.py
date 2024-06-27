from rest_framework import serializers
from .models import Area, TipoCultivo, Enfermedades, Tratamientos, Cultivo, Vehiculos, Animales, CultivoEnfermedad

class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = '__all__'

class TipoCultivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoCultivo
        fields = '__all__'

class EnfermedadesSerializer(serializers.ModelSerializer):
    type_crops = TipoCultivoSerializer(read_only=True)

    class Meta:
        model = Enfermedades
        fields = '__all__'

class TratamientosSerializer(serializers.ModelSerializer):
    disease = EnfermedadesSerializer(read_only=True)

    class Meta:
        model = Tratamientos
        fields = '__all__'

class CultivoSerializer(serializers.ModelSerializer):
    type = TipoCultivoSerializer(read_only=True)
    area = AreaSerializer(read_only=True)
    disease = EnfermedadesSerializer(many=True, read_only=True)

    class Meta:
        model = Cultivo
        fields = '__all__'

class VehiculosSerializer(serializers.ModelSerializer):
    manager = serializers.StringRelatedField(read_only=True)
    area = AreaSerializer(read_only=True)

    class Meta:
        model = Vehiculos
        fields = '__all__'

class AnimalesSerializer(serializers.ModelSerializer):
    manager = serializers.StringRelatedField(read_only=True)
    area = AreaSerializer(read_only=True)

    class Meta:
        model = Animales
        fields = '__all__'

class CultivoEnfermedadSerializer(serializers.ModelSerializer):
    manager = serializers.StringRelatedField(read_only=True)
    treatment = TratamientosSerializer(read_only=True)
    disease = EnfermedadesSerializer(read_only=True)
    crop = CultivoSerializer(read_only=True)

    class Meta:
        model = CultivoEnfermedad
        fields = '__all__'