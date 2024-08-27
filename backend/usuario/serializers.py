

from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework.validators import ValidationError

from .models import *


class LogoutSerializer(serializers.Serializer):

    refresh = serializers.CharField()

    def validate(self, attrs):
        self.refresh = attrs['refresh']
        return attrs

    def save(self, **kwargs):
        try:
            RefreshToken(self.refresh).blacklist()

        except TokenError:
            raise ValidationError({'refresh': 'Token falso'})

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'
        

class UserSerializer(serializers.ModelSerializer):
    rol = serializers.PrimaryKeyRelatedField(queryset=Role.objects.all(), allow_null=True)

    class Meta:
        model = User
        fields = ('id', 'password', 'email', 'rol')  # Agrega 'rol' aquí
        extra_kwargs = {
            'id': {'read_only': True},
            'password': {'write_only': True}
        }
    
    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data["email"],
            rol=validated_data.get("rol", None),  # Agrega 'rol' aquí
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    def update(self, instance, validated_data):
        if validated_data.get('email'):
            instance.email = validated_data['email']
        if validated_data.get('password'):
            instance.set_password(validated_data['password'])
        if validated_data.get('rol'):  # Agrega este bloque
            instance.rol = validated_data['rol']
        instance.save()
        return instance




class UserReadSerializer(serializers.ModelSerializer):
    rol = RoleSerializer()
    class Meta:
        model = User
        fields = "__all__"
        