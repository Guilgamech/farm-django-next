from django.db import models
from usuario.models import Role, User, UserManager

class ActivosManager(models.Manager):
  def get_queryset(self):
    return super().get_queryset().filter(is_deleted=False)

class Base(models.Model):
    is_deleted = models.BooleanField(default=False)
    
    objects = ActivosManager()
    
    def soft_delete(self):
        self.is_deleted = True
        self.save()

    def restore(self):
        self.is_deleted = False
        self.save()

    def delete(self, *args, **kwargs):
        self.soft_delete()
    class Meta:
        abstract = True

class Area(Base):
    code = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    total_area = models.FloatField()

    def __str__(self):
        return self.name
    
class Incidencias(Base):
    type = models.CharField(max_length=255)
    date = models.DateTimeField(null=True, default=None)
    status = models.CharField(max_length=255)
    damage = models.CharField(max_length=255)
    area = models.ForeignKey(Area, on_delete=models.CASCADE, related_name='incidencias')

    
    def __str__(self):
        return self.type

    
class TipoCultivo(Base):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class TipoFlota(Base):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name
    
class Trabajador(Base):
    trabajador_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    ci = models.CharField(max_length=255)
    age = models.IntegerField()
    direction = models.CharField(max_length=255)
    area = models.ForeignKey(Area, on_delete=models.CASCADE, related_name='trabajadores')
    
    def __str__(self):
        return self.name
    
    
class Agricola(Trabajador):
    skill = models.CharField(max_length=255)


    def __str__(self):
        return self.name

class Oficina(Trabajador, User):
    username = models.CharField(max_length=255)
    
    def __str__(self):
        return self.username


class Enfermedades(Base):
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    type_crops = models.ForeignKey(TipoCultivo, on_delete=models.CASCADE, related_name='enfermedades')

    def __str__(self):
        return self.name


class Tratamientos(Base):
    name = models.CharField(max_length=255)
    treatment = models.TextField()
    disease = models.ForeignKey(Enfermedades, on_delete=models.CASCADE, related_name='tratamientos')

    def __str__(self):
        return self.name


class Cultivo(Base):
    STATUS_CHOICES = (
        ('sembrado', 'Sembrado'),
        ('cosechado', 'Cosechado'),
        ('recogido', 'Recogido'),
    )
    code = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)

    status = models.CharField(max_length=12, choices=STATUS_CHOICES)
    type = models.ForeignKey(TipoCultivo, on_delete=models.CASCADE, related_name='cultivos')
    manager = models.ForeignKey(Trabajador, on_delete=models.CASCADE, related_name='manager_cultivo')
    areas = models.ManyToManyField(Area, through='AreaCultivo', related_name='areas_cultivo')
    workers = models.ManyToManyField(Agricola, through='AgricolaCultivo', related_name='agricolas_cultivo')
    disease = models.ManyToManyField(Enfermedades, through="CultivoEnfermedad", related_name='enfermedades_cultivo')

    def __str__(self):
        return self.name


class Flota(Base):
    STATUS_CHOICES = (
        ('deteriorado', 'Deteriorado'),
        ('optimo', 'Optimo'),
    )
    code = models.CharField(max_length=255, unique=True)
    status = models.CharField(max_length=12, choices=STATUS_CHOICES)
    type = models.ForeignKey(TipoFlota, on_delete=models.CASCADE, related_name='flotas')
    manager = models.ForeignKey(Trabajador, on_delete=models.CASCADE, related_name='flotas')
    area = models.ForeignKey(Area, on_delete=models.CASCADE, related_name='flotas')

    def __str__(self):
        return self.code

class CultivoEnfermedad(models.Model):
    STATUS_CHOICES = (
        ('leve', 'Leve'),
        ('medio', 'Medio'),
        ('grave', 'Grave'),
    )
    disease = models.ForeignKey(Enfermedades, on_delete=models.CASCADE, related_name='enfermedad_cultivos')
    crop = models.ForeignKey(Cultivo, on_delete=models.CASCADE, related_name='enfermedad_cultivos')
    manager = models.ForeignKey(Agricola, on_delete=models.CASCADE, related_name='enfermedad_cultivos')
    treatment = models.ForeignKey(Tratamientos, on_delete=models.CASCADE, related_name='enfermedad_cultivos')
    start = models.DateTimeField(null=True, default=None)
    end = models.DateTimeField(null=True, default=None)
    grade = models.CharField(max_length=12, choices=STATUS_CHOICES)

    class Meta:
        unique_together = ('disease', 'crop', 'treatment', 'start')


class AreaCultivo(models.Model):
    area = models.ForeignKey(to=Area, on_delete=models.CASCADE, related_name="area_cultivos")
    crop = models.ForeignKey(to=Cultivo, on_delete=models.CASCADE, related_name="area_cultivos")
    date_planted = models.DateTimeField(null=True, default=None)
    date_harved = models.DateTimeField(null=True, default=None)
    
    class Meta:
        unique_together = ('area', 'crop')

    def __str__(self):
        init = "AreaCultivo{"
        end = "}"
        return f"{init} area:{str(self.area)}, crop:{str(self.crop)}{end}"    
    
    
class AgricolaCultivo(models.Model):
    crop = models.ForeignKey(Cultivo, on_delete=models.CASCADE, related_name="agricola_cultivos")
    worker = models.ForeignKey(Agricola, on_delete=models.CASCADE, related_name="agricola_cultivos")
    class Meta:
        unique_together = ('crop', 'worker')

    def __str__(self):
        return f"{self.crop.name} - {self.worker.name}"
