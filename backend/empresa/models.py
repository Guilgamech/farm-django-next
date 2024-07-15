from django.db import models
from usuario.models import User

class Area(models.Model):
    code = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    total_area = models.FloatField()

    def __str__(self):
        return self.name
    
class Incidencias(models.Model):
    type = models.CharField(max_length=255, unique=True)
    date = models.DateTimeField(null=True, default=None)
    status = models.CharField(max_length=255)
    damage = models.CharField(max_length=255)
    
    def __str__(self):
        return self.type

    
class TipoCultivo(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class TipoFlota(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name
    
class Trabajador(models.Model):
    trabajador_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    ci = models.CharField(max_length=255)
    age = models.IntegerField()
    direction = models.CharField(max_length=255)
    area = models.ForeignKey(Area, on_delete=models.CASCADE, related_name='Agricola')
    
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


class Enfermedades(models.Model):
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    type_crops = models.ForeignKey(TipoCultivo, on_delete=models.CASCADE, related_name='enfermedades')

    def __str__(self):
        return self.name


class Tratamientos(models.Model):
    name = models.CharField(max_length=255)
    treatment = models.TextField()
    disease = models.ForeignKey(Enfermedades, on_delete=models.CASCADE, related_name='tratamientos')

    def __str__(self):
        return self.name


class Cultivo(models.Model):
    STATUS_CHOICES = (
        ('semilleo', 'Semilleo'),
        ('sembrado', 'Sembrado'),
        ('cocecha', 'Cocecha'),
    )
    code = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)

    status = models.CharField(max_length=12, choices=STATUS_CHOICES)
    type = models.ForeignKey(TipoCultivo, on_delete=models.CASCADE, related_name='cultivos')
    manager = models.ForeignKey(Trabajador, on_delete=models.CASCADE, related_name='manager_cultivo')
    areas = models.ManyToManyField(Area, through='AreaCultivo')
    workers = models.ManyToManyField(Agricola, related_name='worker_cultivos')
    disease = models.ManyToManyField(Enfermedades, through="CultivoEnfermedad", related_name='cultivo_enfermedad')

    def __str__(self):
        return self.name


class Flota(models.Model):
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
    disease = models.ForeignKey(Enfermedades, on_delete=models.CASCADE, related_name='cultivo_enfermedades')
    crop = models.ForeignKey(Cultivo, on_delete=models.CASCADE, related_name='cultivo_enfermedades')
    manager = models.ForeignKey(Agricola, on_delete=models.CASCADE, related_name='cultivo_enfermedades')
    treatment = models.ForeignKey(Tratamientos, on_delete=models.CASCADE, related_name='cultivo_enfermedades')
    start = models.DateTimeField(auto_now_add=True)
    end = models.DateTimeField(null=True, default=None)
    grade = models.CharField(max_length=12, choices=STATUS_CHOICES)

    class Meta:
        unique_together = ('disease', 'crop', 'treatment', 'start')


class AreaCultivo(models.Model):
    area = models.ForeignKey(to=Area, on_delete=models.CASCADE, related_name="area_cultivo")
    crop = models.ForeignKey(to=Cultivo, on_delete=models.CASCADE, related_name="area_cultivo")
    date_planted = models.DateTimeField(auto_now_add=True)
    date_harved = models.DateTimeField(null=True, default=None)
    
    class Meta:
        unique_together = ('area', 'crop')

    def __str__(self):
        init = "AreaCultivo{"
        end = "}"
        return f"{init} area:{str(self.area)}, crop:{str(self.crop)}"
    
    
    