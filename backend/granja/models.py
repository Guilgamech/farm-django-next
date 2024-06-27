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
    


class Enfermedades(models.Model):
    STATUS_CHOICES = (
        ('leve', 'Leve'),
        ('medio', 'Medio'),
        ('grave', 'Grave'),
    )
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    date_start = models.DateTimeField(auto_now_add=True)
    grade = models.CharField(max_length=12, choices=STATUS_CHOICES)
    
    type_crops = models.ForeignKey(TipoCultivo, on_delete=models.CASCADE)
    
    
class Tratamientos(models.Model):
    treatment = models.TextField()
    
    disease = models.ForeignKey(Enfermedades, on_delete=models.CASCADE)
    

class Cultivo(models.Model):
    STATUS_CHOICES = (
        ('sembrado', 'Sembrado'),
        ('cocecha', 'Cocecha'),
        ('recogida', 'Recogida'),
    )
    code = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    date_planted = models.DateTimeField(auto_now_add=True)
    date_harved = models.DateTimeField(auto_now_add=False)
    status = models.CharField(max_length=12, choices=STATUS_CHOICES)
    
    type = models.ForeignKey(TipoCultivo, on_delete=models.CASCADE)
    area = models.ForeignKey(Area, on_delete=models.CASCADE)
    
    disease = models.ManyToManyField(Enfermedades)
    
class Vehiculos(models.Model):
    STATUS_CHOICES = (
        ('deteriorado', 'Deteriorado'),
        ('optimo', 'Optimo'),
    )
    number = models.CharField(max_length=255)
    status = models.CharField(max_length=12, choices=STATUS_CHOICES)
    
    manager = models.ForeignKey(User, on_delete=models.CASCADE)
    area = models.ForeignKey(Area, on_delete=models.CASCADE)
    
    
class Animales(models.Model):
    code = models.CharField(max_length=255)
    race = models.CharField(max_length=255)
    species = models.CharField(max_length=255)
    
    manager = models.ForeignKey(User, on_delete=models.CASCADE)
    area = models.ForeignKey(Area, on_delete=models.CASCADE)
    
    
class CultivoEnfermedad(models.Model):
    manager = models.ForeignKey(User, on_delete=models.CASCADE)
    treatment = models.ForeignKey(Tratamientos, on_delete=models.CASCADE)
    disease = models.ForeignKey(Enfermedades, on_delete=models.CASCADE)
    crop = models.ForeignKey(Cultivo, on_delete=models.CASCADE)
    
    

    
    
