from django.shortcuts import render

# Create your views here.
# views.py

from rest_framework import viewsets, status, mixins

from django.core.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .models import User
from .serializers import UserSerializer, LogoutSerializer

class LogoutView(viewsets.GenericViewSet, mixins.CreateModelMixin):
    serializer_class = LogoutSerializer
    permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(data=None, status=status.HTTP_205_RESET_CONTENT)


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    
    def create(self, request, *args, **kwargs):
        # Permitir la creación de usuarios sin autenticación
        return super().create(request, *args, **kwargs)
    
    def update(self, request, *args, **kwargs):
        user: User = self.request.user
        # Verificar si el usuario autenticado es el propietario de la cuenta
        if user == self.get_object():
            return super().update(request, *args, **kwargs)
        else:
            raise PermissionDenied()

    def partial_update(self, request, *args, **kwargs):
        user: User = self.request.user
        # Verificar si el usuario autenticado es el propietario de la cuenta
        if user == self.get_object():
            return super().partial_update(request, *args, **kwargs)
        else:
            raise PermissionDenied()

    def destroy(self, request, *args, **kwargs):
        user: User = self.request.user
        # Verificar si el usuario autenticado es el propietario de la cuenta
        if user == self.get_object():
            return super().destroy(request, *args, **kwargs)
        else:
            raise PermissionDenied()
        
    def list(self, request, *args, **kwargs):
        user: User = self.request.user
        if user.is_admin and user.is_authenticated:
            return super().list(request, *args, **kwargs)
        else:
            raise PermissionDenied()
        