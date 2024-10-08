from usuario.serializers import RoleSerializer
from rest_framework import serializers
from .models import *
from django.utils import timezone
import datetime


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
    
    
    def validate(self, data):
        ci = data.get('ci')
        age = data.get('age')

        if ci and age is not None:
            # Extrae los dos primeros dígitos del carnet
            year_from_ci = int(ci[:2])
            month_from_ci = int(ci[2:4])
            day_from_ci = int(ci[4:6])

            if not (1 <= month_from_ci <= 12):
                raise serializers.ValidationError({"ci": "Los dígitos 3 y 4 del CI deben representar un mes válido (1-12)."})

            if not (1 <= day_from_ci <= 31):
                raise serializers.ValidationError({"ci": "Los dígitos 5 y 6 del CI deben representar un día válido (1-31)."})


            # Obtén el año actual
            current_year = datetime.datetime.now().year

            # Determina el año de nacimiento
            if year_from_ci >= 0 and year_from_ci <= 99:
                year_of_birth = 2000 + year_from_ci if (2000 + year_from_ci) <= current_year else 1900 + year_from_ci
            else:
                raise serializers.ValidationError("El año de nacimiento en el carnet de identidad es inválido.")

            # Calcula la edad esperada
            expected_age = current_year - year_of_birth

            # Verifica que la edad calculada esté en el rango permitido
            if expected_age < 18 or expected_age > 70:
                raise serializers.ValidationError("La edad calculada a partir del carnet de identidad no está en el rango permitido (18-70 años).")

            # Verifica que la edad proporcionada coincida con la edad calculada
            if age != expected_age:
                raise serializers.ValidationError(
                     {"age": [f"La edad proporcionada ({age}) no coincide con la edad calculada a partir del carnet de identidad ({expected_age})."]}
                )

        return data
class AgricolaReadSerializer(serializers.ModelSerializer):
    area = AreaSerializer()
    
    class Meta:
        model = Agricola
        fields = '__all__'
        
### Trabajador Oficina Serializers

class OficinaSerializer(serializers.ModelSerializer):
    area = serializers.PrimaryKeyRelatedField(queryset=Area.objects.all())
    rol = serializers.PrimaryKeyRelatedField(queryset=Role.objects.all(), allow_null=True)
    email = serializers.EmailField(required=False) 
    class Meta:
        model = Oficina
        fields = ('id', 'name', 'ci', 'age', 'direction',  'username', 'password', 'email', 'rol', 'area')  # Agrega 'rol' aquí
        extra_kwargs = {
            'id': {'read_only': True},
            'password': {'write_only': True}
        }
        
    def create(self, validated_data):
        if 'email' not in validated_data:
            raise serializers.ValidationError({'email': 'Este campo es obligatorio al crear un nuevo usuario.'})
        user = Oficina.objects.create(
            email=validated_data["email"],
            name=validated_data["name"],
            ci=validated_data["ci"],
            age=validated_data["age"],
            direction=validated_data["direction"],
            username=validated_data["username"],
            rol=validated_data.get("rol", None),  # Agrega 'rol' aquí
            area=validated_data.get("area", None),  # Agrega 'rol' aquí
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    def update(self, instance, validated_data):
        new_email = validated_data.get('email', None)
        if new_email is not None and new_email != instance.email:
            if User.objects.filter(email=new_email).exclude(pk=instance.pk).exists():
                raise serializers.ValidationError({"email": "Este correo electrónico ya está en uso."})
            instance.email = new_email

        for attr, value in validated_data.items():
            if attr not in ['password', 'email']:  # Excluye 'password' y 'email'
                setattr(instance, attr, value)
    
    # Actualizar el password solo si se proporciona un nuevo valor
        if 'password' in validated_data:
            instance.set_password(validated_data['password'])
            instance.save()
            return instance
    
    def validate(self, data):
        ci = data.get('ci')
        age = data.get('age')

        if ci and age is not None:
            # Extrae los dos primeros dígitos del carnet
            year_from_ci = int(ci[:2])
            month_from_ci = int(ci[2:4])
            day_from_ci = int(ci[4:6])

            if not (1 <= month_from_ci <= 12):
                raise serializers.ValidationError({"ci": "Los dígitos 3 y 4 del CI deben representar un mes válido (1-12)."})

            if not (1 <= day_from_ci <= 31):
                raise serializers.ValidationError({"ci": "Los dígitos 5 y 6 del CI deben representar un día válido (1-31)."})


            # Obtén el año actual
            current_year = datetime.datetime.now().year

            # Determina el año de nacimiento
            if year_from_ci >= 0 and year_from_ci <= 99:
                year_of_birth = 2000 + year_from_ci if (2000 + year_from_ci) <= current_year else 1900 + year_from_ci
            else:
                raise serializers.ValidationError("El año de nacimiento en el carnet de identidad es inválido.")

            # Calcula la edad esperada
            expected_age = current_year - year_of_birth

            # Verifica que la edad calculada esté en el rango permitido
            if expected_age < 18 or expected_age > 70:
                raise serializers.ValidationError("La edad calculada a partir del carnet de identidad no está en el rango permitido (18-70 años).")

            # Verifica que la edad proporcionada coincida con la edad calculada
            if age != expected_age:
                raise serializers.ValidationError(
                     {"age": [f"La edad proporcionada ({age}) no coincide con la edad calculada a partir del carnet de identidad ({expected_age})."]}
                )

        return data
        
class OficinaReadSerializer(serializers.ModelSerializer):
    area = AreaSerializer()
    rol = RoleSerializer()
    class Meta:
        model = Oficina
        fields = '__all__'

### Trabajador Serializers

class TrabajadorSerializer(serializers.ModelSerializer):
    area = serializers.PrimaryKeyRelatedField(queryset=Area.objects.all())
    type = serializers.SerializerMethodField()
    
    class Meta:
        model = Trabajador
        fields = '__all__'
        
    def get_type(self, obj):
        agricola = Agricola.objects.filter(trabajador_id = obj.trabajador_id).first()
        if agricola is not None:
            return "Agricola"
        else:
            return "Oficina"
        
        
        

class TrabajadorReadSerializer(serializers.ModelSerializer):
    area = AreaSerializer()
    type = serializers.SerializerMethodField()

    class Meta:
        model = Trabajador
        fields = '__all__'
    
    def get_type(self, obj):
        agricola = Agricola.objects.filter(trabajador_id = obj.trabajador_id).first()
        if agricola is not None:
            return "Agricola"
        else:
            return "Oficina"


class IncidenciasSerializer(serializers.ModelSerializer):
    area = serializers.PrimaryKeyRelatedField(queryset=Area.objects.all())

    
    def validate_date(self, value):
        if value and value > timezone.now():
            raise serializers.ValidationError("La fecha no puede ser mayor que la fecha actual.")
        return value
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
        fields = ('id', 'code', 'name', 'status', 'type', 'manager')
        extra_kwargs = {
            'id': {'read_only': True},

        }

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
    
    def validate_start(self, value):
        if value and value > timezone.now():
            raise serializers.ValidationError("La fecha no puede ser mayor que la fecha actual.")
        return value

    def validate(self, data):
        # Obtenemos la instancia actual si estamos en una actualización
        instance = getattr(self, 'instance', None)
        
        # Usamos los valores del cuerpo de la solicitud, o si no existen, de la instancia actual
        date_start = data.get('start', instance.start if instance else None)
        date_end = data.get('end', instance.end if instance else None)
        
        if date_start and date_end:
            if date_end <= date_start:
                raise serializers.ValidationError({
                    'end': 'El campo Fecha Fin no puede ser menor o igual al campo Fecha de Inicio.'
                })
        
        return data
    
    class Meta:
        model = CultivoEnfermedad
        fields = '__all__'


class CultivoEnfermedadReadSerializer(serializers.ModelSerializer):
    manager = TrabajadorSerializer()
    crop = CultivoSerializer()
    
    treatment = TratamientosReadSerializer()
    disease = EnfermedadesReadSerializer()

    class Meta:
        model = CultivoEnfermedad
        fields = '__all__'
        
class AreaCultivoSerializer(serializers.ModelSerializer):
    area = serializers.PrimaryKeyRelatedField(queryset=Area.objects.all())
    crop = serializers.PrimaryKeyRelatedField(queryset=Cultivo.objects.all())
    
    def validate_date_planted(self, value):
        if value and value > timezone.now():
            raise serializers.ValidationError("La fecha no puede ser mayor que la fecha actual.")
        return value
    
    def validate(self, data):
        # Obtenemos la instancia actual si estamos en una actualización
        instance = getattr(self, 'instance', None)
        
        # Usamos los valores del cuerpo de la solicitud, o si no existen, de la instancia actual
        date_planted = data.get('date_planted', instance.date_planted if instance else None)
        date_harved = data.get('date_harved', instance.date_harved if instance else None)
        
        if date_planted and date_harved:
            if date_harved <= date_planted:
                raise serializers.ValidationError({
                    'date_harved': 'El campo Fecha de Cocecha no puede ser menor o igual al campo Fecha de Plantacion.'
                })
        
        return data
    class Meta:
        model = AreaCultivo
        fields = '__all__'

class AreaCultivoReadSerializer(serializers.ModelSerializer):
    area = AreaSerializer()
    crop = CultivoSerializer()
    
    class Meta:
        model = AreaCultivo
        fields = '__all__'
class AgricolaCultivoSerializer(serializers.ModelSerializer):
    crop = serializers.PrimaryKeyRelatedField(queryset=Cultivo.objects.all())
    worker = serializers.PrimaryKeyRelatedField(queryset=Agricola.objects.all())

    class Meta:
        model = AgricolaCultivo
        fields = '__all__'
        
class AgricolaCultivoReadSerializer(serializers.ModelSerializer):
    crop = CultivoSerializer()
    worker = AgricolaSerializer()

    class Meta:
        model = AgricolaCultivo
        fields = '__all__'

class CultivoReadSerializer(serializers.ModelSerializer):
    type = TipoCultivoSerializer()
    manager = TrabajadorSerializer()
    areas = AreaCultivoReadSerializer(source='area_cultivos',many=True)
    workers = AgricolaCultivoReadSerializer(source='agricola_cultivos',many=True)
    diseases = CultivoEnfermedadReadSerializer(source='enfermedad_cultivos', many=True)

    class Meta:
        model = Cultivo
        fields = '__all__'
        
        
