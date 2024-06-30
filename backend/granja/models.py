from django.db import models
from usuario.models import User


# Create your models here.
# Cultivo vehiculo agricultor Enfermedad tratamiento enfermedad animal
class Area(models.Model):
    code = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    total_area = models.FloatField()


class TipoCultivo(models.Model):
    name = models.CharField(max_length=255)


class TipoFlota(models.Model):
    name = models.CharField(max_length=255)


class Agricultores(models.Model):
    name = models.CharField(max_length=255)
    ci = models.CharField(max_length=255)
    age = models.IntegerField()
    
    area = models.ForeignKey(Area, on_delete=models.CASCADE)
    

class Enfermedades(models.Model):
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    
    type_crops = models.ForeignKey(TipoCultivo, on_delete=models.CASCADE)
    
    
class Tratamientos(models.Model):
    name = models.CharField(max_length=255)
    treatment = models.TextField()

    disease = models.ForeignKey(Enfermedades, on_delete=models.CASCADE)
    

class Cultivo(models.Model):
    STATUS_CHOICES = (
        ('semilleo', 'Semilleo'),
        ('sembrado', 'Sembrado'),
        ('cocecha', 'Cocecha'),
    )
    code = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    date_planted = models.DateTimeField(auto_now_add=True)
    date_harved = models.DateTimeField(null=True, default=None)

    status = models.CharField(max_length=12, choices=STATUS_CHOICES)
    
    type = models.ForeignKey(TipoCultivo, on_delete=models.CASCADE)
    manager = models.ForeignKey(Agricultores, on_delete=models.CASCADE, related_name='manager_cultivos')

    areas = models.ManyToManyField(Area)

    workers = models.ManyToManyField(Agricultores, related_name='worker_cultivos')
    disease = models.ManyToManyField(Enfermedades, through="CultivoEnfermedad")


class Flota(models.Model):
    STATUS_CHOICES = (
        ('deteriorado', 'Deteriorado'),
        ('optimo', 'Optimo'),
    )
    code = models.CharField(max_length=255)
    status = models.CharField(max_length=12, choices=STATUS_CHOICES)

    type = models.ForeignKey(TipoFlota, on_delete=models.CASCADE)
    manager = models.ForeignKey(Agricultores, on_delete=models.CASCADE)
    area = models.ForeignKey(Area, on_delete=models.CASCADE)
    
    
class Animales(models.Model):
    code = models.CharField(max_length=255)
    race = models.CharField(max_length=255)
    species = models.CharField(max_length=255)
    
    manager = models.ForeignKey(Agricultores, on_delete=models.CASCADE)
    area = models.ForeignKey(Area, on_delete=models.CASCADE)
    
    
class CultivoEnfermedad(models.Model):
    STATUS_CHOICES = (
        ('leve', 'Leve'),
        ('medio', 'Medio'),
        ('grave', 'Grave'),
    )
    disease = models.ForeignKey(Enfermedades, on_delete=models.CASCADE)
    crop = models.ForeignKey(Cultivo, on_delete=models.CASCADE)

    manager = models.ForeignKey(Agricultores, on_delete=models.CASCADE)
    treatment = models.ForeignKey(Tratamientos, on_delete=models.CASCADE)

    start = models.DateTimeField(auto_now_add=True)
    end = models.DateTimeField(null=True, default=None)

    grade = models.CharField(max_length=12, choices=STATUS_CHOICES)

    class Meta:
        unique_together = ('disease', 'crop', 'treatment', 'start')

    
    
