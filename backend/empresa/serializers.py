from rest_framework import serializers
from .models import *


class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = '__all__'





class TipoCultivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoCultivo
        fields = '__all__'


class TipoFlotaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoFlota
        fields = '__all__'
        
        

        
### Trabajador Agricola Serializers
        
class AgricolaSerializer(serializers.ModelSerializer):
    area = serializers.PrimaryKeyRelatedField(queryset=Area.objects.all())
    
    class Meta:
        model = Agricola
        fields = '__all__'
        
class AgricolaReadSerializer(serializers.ModelSerializer):
    area = AreaSerializer()
    
    class Meta:
        model = Agricola
        fields = '__all__'
        
### Trabajador Oficina Serializers

class OficinaSerializer(serializers.ModelSerializer):
    area = serializers.PrimaryKeyRelatedField(queryset=Area.objects.all())
    
    class Meta:
        model = Oficina
        fields = '__all__'
        
class OficinaReadSerializer(serializers.ModelSerializer):
    area = AreaSerializer()
    
    class Meta:
        model = Oficina
        fields = '__all__'

### Trabajador Serializers

class TrabajadorSerializer(serializers.ModelSerializer):
    area = serializers.PrimaryKeyRelatedField(queryset=Area.objects.all())
    type = serializers.SerializerMethodField()
    oficina = serializers.SerializerMethodField()
    
    class Meta:
        model = Trabajador
        fields = '__all__'
        
    def get_type(self, obj):
        try:
            agricola = Agricola.objects.get(trabajador_ptr=obj.trabajador_id)
            return AgricolaSerializer(agricola).data
        except Agricola.DoesNotExist:
            return None

    def get_oficina(self, obj):
        try:
            oficina = Oficina.objects.get(trabajador_ptr=obj.trabajador_id)
            return OficinaSerializer(oficina).data
        except Oficina.DoesNotExist:
            return None

class TrabajadorReadSerializer(serializers.ModelSerializer):
    area = AreaSerializer()
    agricola = serializers.SerializerMethodField()
    oficina = serializers.SerializerMethodField()

    class Meta:
        model = Trabajador
        fields = '__all__'
    
    def get_agricola(self, obj):
        try:
            agricola = Agricola.objects.get(trabajador_ptr=obj.trabajador_id)
            return AgricolaReadSerializer(agricola).data
        except Agricola.DoesNotExist:
            return None

    def get_oficina(self, obj):
        try:
            oficina = Oficina.objects.get(trabajador_ptr=obj.trabajador_id)
            return OficinaReadSerializer(oficina).data
        except Oficina.DoesNotExist:
            return None

class IncidenciasSerializer(serializers.ModelSerializer):
    area = serializers.PrimaryKeyRelatedField(queryset=Area.objects.all())

    class Meta:
        model = Incidencias
        fields = '__all__'
        
class IncidenciasReadSerializer(serializers.ModelSerializer):
    area = AreaSerializer()

    class Meta:
        model = Incidencias
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
    manager = serializers.PrimaryKeyRelatedField(queryset=Trabajador.objects.all())

    class Meta:
        model = Cultivo
        fields = ('code', 'name', 'status', 'type', 'manager')


class FlotaSerializer(serializers.ModelSerializer):
    type = serializers.PrimaryKeyRelatedField(queryset=TipoFlota.objects.all())
    manager = serializers.PrimaryKeyRelatedField(queryset=Trabajador.objects.all())
    area = serializers.PrimaryKeyRelatedField(queryset=Area.objects.all())

    class Meta:
        model = Flota
        fields = '__all__'


class FlotaReadSerializer(serializers.ModelSerializer):
    type = TipoFlotaSerializer()
    manager = TrabajadorSerializer()
    area = AreaSerializer()

    class Meta:
        model = Flota
        fields = '__all__'



class CultivoEnfermedadSerializer(serializers.ModelSerializer):
    manager = serializers.PrimaryKeyRelatedField(queryset=Agricola.objects.all())
    treatment = serializers.PrimaryKeyRelatedField(queryset=Tratamientos.objects.all())
    disease = serializers.PrimaryKeyRelatedField(queryset=Enfermedades.objects.all())
    crop = serializers.PrimaryKeyRelatedField(queryset=Cultivo.objects.all())

    class Meta:
        model = CultivoEnfermedad
        fields = '__all__'


class CultivoEnfermedadReadSerializer(serializers.ModelSerializer):
    manager = TrabajadorSerializer()
    treatment = TratamientosReadSerializer()
    disease = EnfermedadesReadSerializer()

    class Meta:
        model = CultivoEnfermedad
        fields = ('disease', 'manager', 'treatment', 'start', 'end', 'grade')
        
class AreaCultivoSerializer(serializers.ModelSerializer):
    area = serializers.PrimaryKeyRelatedField(queryset=Area.objects.all())
    crop = serializers.PrimaryKeyRelatedField(queryset=Cultivo.objects.all())
    
    class Meta:
        model = AreaCultivo
        fields = '__all__'

class AreaCultivoReadSerializer(serializers.ModelSerializer):
    area = AreaSerializer()
    crop = CultivoSerializer()
    
    class Meta:
        model = AreaCultivo
        fields = '__all__'


class CultivoReadSerializer(serializers.ModelSerializer):
    type = TipoCultivoSerializer()
    manager = TrabajadorSerializer()
    area = AreaCultivoReadSerializer(source='area_cultivo',many=True)
    workers = AgricolaSerializer(many=True)
    disease = CultivoEnfermedadReadSerializer(many=True)

    class Meta:
        model = Cultivo
        fields = '__all__'
        
        
