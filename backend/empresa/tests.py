# Create your tests here.
from django.test import TestCase
from empresa.models import Area, Incidencias, TipoCultivo, TipoFlota, Trabajador, Agricola, Oficina, Enfermedades, Tratamientos, Cultivo, Flota, CultivoEnfermedad, AreaCultivo

class AreaModelTest(TestCase):
    def setUp(self):
        self.area = Area.objects.create(code="A001", name="Area 1", total_area=100.0)

    def test_area_creation(self):
        self.assertEqual(self.area.name, "Area 1")
        self.assertEqual(self.area.total_area, 100.0)
        self.assertEqual(str(self.area), "Area 1")

    def test_area_fields(self):
        self.assertEqual(self.area.code, "A001")
        self.assertEqual(self.area.name, "Area 1")
        self.assertEqual(self.area.total_area, 100.0)

    def test_area_string_representation(self):
        self.assertEqual(str(self.area), "Area 1")

class IncidenciasModelTest(TestCase):
    def setUp(self):
        self.area = Area.objects.create(code="A001", name="Area 1", total_area=100.0)
        self.incidencia = Incidencias.objects.create(type="Type 1", status="Status 1", damage="Damage 1", area=self.area)

    def test_incidencias_creation(self):
        self.assertEqual(self.incidencia.type, "Type 1")
        self.assertEqual(self.incidencia.status, "Status 1")
        self.assertEqual(self.incidencia.damage, "Damage 1")
        self.assertEqual(str(self.incidencia), "Type 1")

    def test_incidencias_fields(self):
        self.assertEqual(self.incidencia.type, "Type 1")
        self.assertEqual(self.incidencia.status, "Status 1")
        self.assertEqual(self.incidencia.damage, "Damage 1")
        self.assertEqual(self.incidencia.area, self.area)

class TipoCultivoModelTest(TestCase):
    def setUp(self):
        self.tipo_cultivo = TipoCultivo.objects.create(name="Cultivo 1")

    def test_tipo_cultivo_creation(self):
        self.assertEqual(self.tipo_cultivo.name, "Cultivo 1")
        self.assertEqual(str(self.tipo_cultivo), "Cultivo 1")

class TipoFlotaModelTest(TestCase):
    def setUp(self):
        self.tipo_flota = TipoFlota.objects.create(name="Flota 1")

    def test_tipo_flota_creation(self):
        self.assertEqual(self.tipo_flota.name, "Flota 1")
        self.assertEqual(str(self.tipo_flota), "Flota 1")

class TrabajadorModelTest(TestCase):
    def setUp(self):
        self.area = Area.objects.create(code="A001", name="Area 1", total_area=100.0)
        self.trabajador = Trabajador.objects.create(name="Trabajador 1", ci="123456789", age=30, direction="Direccion 1", area=self.area)

    def test_trabajador_creation(self):
        self.assertEqual(self.trabajador.name, "Trabajador 1")
        self.assertEqual(self.trabajador.ci, "123456789")
        self.assertEqual(self.trabajador.age, 30)
        self.assertEqual(self.trabajador.direction, "Direccion 1")
        self.assertEqual(str(self.trabajador), "Trabajador 1")

    def test_trabajador_fields(self):
        self.assertEqual(self.trabajador.name, "Trabajador 1")
        self.assertEqual(self.trabajador.ci, "123456789")
        self.assertEqual(self.trabajador.age, 30)
        self.assertEqual(self.trabajador.direction, "Direccion 1")
        self.assertEqual(self.trabajador.area, self.area)

class AgricolaModelTest(TestCase):
    def setUp(self):
        self.area = Area.objects.create(code="A001", name="Area 1", total_area=100.0)
        self.agricola = Agricola.objects.create(name="Agricola 1", ci="123456789", age=25, direction="Direccion 2", area=self.area, skill="Skill 1")

    def test_agricola_creation(self):
        self.assertEqual(self.agricola.name, "Agricola 1")
        self.assertEqual(self.agricola.ci, "123456789")
        self.assertEqual(self.agricola.age, 25)
        self.assertEqual(self.agricola.direction, "Direccion 2")
        self.assertEqual(self.agricola.skill, "Skill 1")
        self.assertEqual(str(self.agricola), "Agricola 1")

    def test_agricola_fields(self):
        self.assertEqual(self.agricola.name, "Agricola 1")
        self.assertEqual(self.agricola.ci, "123456789")
        self.assertEqual(self.agricola.age, 25)
        self.assertEqual(self.agricola.direction, "Direccion 2")
        self.assertEqual(self.agricola.area, self.area)
        self.assertEqual(self.agricola.skill, "Skill 1")

class OficinaModelTest(TestCase):
    def setUp(self):
        self.area = Area.objects.create(code="A001", name="Area 1", total_area=100.0)
        self.oficina = Oficina.objects.create(name="Oficina 1", ci="123456789", age=35, direction="Direccion 3", area=self.area, username="username1")

    def test_oficina_creation(self):
        self.assertEqual(self.oficina.name, "Oficina 1")
        self.assertEqual(self.oficina.ci, "123456789")
        self.assertEqual(self.oficina.age, 35)
        self.assertEqual(self.oficina.direction, "Direccion 3")
        self.assertEqual(self.oficina.username, "username1")
        self.assertEqual(str(self.oficina), "username1")

    def test_oficina_fields(self):
        self.assertEqual(self.oficina.name, "Oficina 1")
        self.assertEqual(self.oficina.ci, "123456789")
        self.assertEqual(self.oficina.age, 35)
        self.assertEqual(self.oficina.direction, "Direccion 3")
        self.assertEqual(self.oficina.area, self.area)
        self.assertEqual(self.oficina.username, "username1")

class EnfermedadesModelTest(TestCase):
    def setUp(self):
        self.tipo_cultivo = TipoCultivo.objects.create(name="Tipo Cultivo 1")
        self.enfermedad = Enfermedades.objects.create(
            name="Enfermedad 1", 
            category="Categoria 1", 
            type_crops=self.tipo_cultivo
        )

    def test_enfermedades_creation(self):
        self.assertEqual(self.enfermedad.name, "Enfermedad 1")
        self.assertEqual(self.enfermedad.category, "Categoria 1")
        self.assertEqual(self.enfermedad.type_crops, self.tipo_cultivo)
        self.assertEqual(str(self.enfermedad), "Enfermedad 1")

class TratamientosModelTest(TestCase):
    def setUp(self):
        self.tipo_cultivo = TipoCultivo.objects.create(name="Tipo Cultivo 1")
        self.enfermedad = Enfermedades.objects.create(
            name="Enfermedad 1", 
            category="Categoria 1", 
            type_crops=self.tipo_cultivo
        )
        self.tratamiento = Tratamientos.objects.create(
            name="Tratamiento 1", 
            treatment="Tratamiento Detalles", 
            disease=self.enfermedad
        )

    def test_tratamientos_creation(self):
        self.assertEqual(self.tratamiento.name, "Tratamiento 1")
        self.assertEqual(self.tratamiento.treatment, "Tratamiento Detalles")
        self.assertEqual(self.tratamiento.disease, self.enfermedad)
        self.assertEqual(str(self.tratamiento), "Tratamiento 1")

class CultivoModelTest(TestCase):
    def setUp(self):
        self.tipo_cultivo = TipoCultivo.objects.create(name="Tipo Cultivo 1")
        self.area = Area.objects.create(code="A001", name="Area 1", total_area=100.0)
        self.trabajador = Trabajador.objects.create(
            name="Trabajador 1", 
            ci="123456789", 
            age=30, 
            direction="Direccion 1", 
            area=self.area
        )
        self.cultivo = Cultivo.objects.create(
            code="C001", 
            name="Cultivo 1", 
            status="semilleo", 
            type=self.tipo_cultivo, 
            manager=self.trabajador
        )

    def test_cultivo_creation(self):
        self.assertEqual(self.cultivo.code, "C001")
        self.assertEqual(self.cultivo.name, "Cultivo 1")
        self.assertEqual(self.cultivo.status, "semilleo")
        self.assertEqual(self.cultivo.type, self.tipo_cultivo)
        self.assertEqual(self.cultivo.manager, self.trabajador)
        self.assertEqual(str(self.cultivo), "Cultivo 1")

    def test_cultivo_status_choices(self):
        cultivo = Cultivo.objects.get(id=self.cultivo.id)
        self.assertEqual(cultivo.status, "semilleo")
        cultivo.status = "sembrado"
        cultivo.save()
        self.assertEqual(cultivo.status, "sembrado")
        cultivo.status = "cocecha"
        cultivo.save()
        self.assertEqual(cultivo.status, "cocecha")
        
class FlotaModelTest(TestCase):
    def setUp(self):
        self.tipo_flota = TipoFlota.objects.create(name="Tipo Flota 1")
        self.area = Area.objects.create(code="A001", name="Area 1", total_area=100.0)
        self.trabajador = Trabajador.objects.create(
            name="Trabajador 1", 
            ci="123456789", 
            age=30, 
            direction="Direccion 1", 
            area=self.area
        )
        self.flota = Flota.objects.create(
            code="F001", 
            status="optimo", 
            type=self.tipo_flota, 
            manager=self.trabajador, 
            area=self.area
        )

    def test_flota_creation(self):
        self.assertEqual(self.flota.code, "F001")
        self.assertEqual(self.flota.status, "optimo")
        self.assertEqual(self.flota.type, self.tipo_flota)
        self.assertEqual(self.flota.manager, self.trabajador)
        self.assertEqual(self.flota.area, self.area)
        self.assertEqual(str(self.flota), "F001")

class CultivoEnfermedadModelTest(TestCase):
    def setUp(self):
        self.tipo_cultivo = TipoCultivo.objects.create(name="Tipo Cultivo 1")
        self.area = Area.objects.create(code="A001", name="Area 1", total_area=100.0)
        self.trabajador = Agricola.objects.create(
            name="Trabajador 1", 
            ci="123456789", 
            age=30, 
            direction="Direccion 1", 
            area=self.area,
            skill="Skill 1"
        )
        self.cultivo = Cultivo.objects.create(
            code="C001", 
            name="Cultivo 1", 
            status="semilleo", 
            type=self.tipo_cultivo, 
            manager=self.trabajador
        )
        self.enfermedad = Enfermedades.objects.create(
            name="Enfermedad 1", 
            category="Categoria 1", 
            type_crops=self.tipo_cultivo
        )
        self.tratamiento = Tratamientos.objects.create(
            name="Tratamiento 1", 
            treatment="Tratamiento Detalles", 
            disease=self.enfermedad
        )
        self.cultivo_enfermedad = CultivoEnfermedad.objects.create(
            disease=self.enfermedad, 
            crop=self.cultivo, 
            manager=self.trabajador, 
            treatment=self.tratamiento, 
            grade="medio"
        )

    def test_cultivo_enfermedad_creation(self):
        self.assertEqual(self.cultivo_enfermedad.disease, self.enfermedad)
        self.assertEqual(self.cultivo_enfermedad.crop, self.cultivo)
        self.assertEqual(self.cultivo_enfermedad.manager, self.trabajador)
        self.assertEqual(self.cultivo_enfermedad.treatment, self.tratamiento)
        self.assertEqual(self.cultivo_enfermedad.grade, "medio")

