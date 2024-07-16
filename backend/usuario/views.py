from django.core.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from helpers.helper import *
from rest_framework import viewsets, permissions, status, views, mixins, generics



from .models import *
from .serializers import *

class LogoutView(viewsets.GenericViewSet, mixins.CreateModelMixin):
    serializer_class = LogoutSerializer
    permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(data=None, status=status.HTTP_205_RESET_CONTENT)


class RoleView(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [permissions.IsAuthenticated]

class UserView(NestedViewSetMixin):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    read_serializer_class = UserReadSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def create(self, request, *args, **kwargs):
        user: User = self.request.user
        # Permitir la creación de usuarios sin autenticación
        if user.is_admin:
            return super().create(request, *args, **kwargs)
        else:
            raise PermissionDenied()
    
    def update(self, request, *args, **kwargs):
        user: User = self.request.user
        # Verificar si el usuario autenticado es el propietario de la cuenta
        if user.is_admin:
            return super().update(request, *args, **kwargs)
        else:
            raise PermissionDenied()

    def partial_update(self, request, *args, **kwargs):
        user: User = self.request.user
        # Verificar si el usuario autenticado es el propietario de la cuenta
        if user.is_admin:
            return super().partial_update(request, *args, **kwargs)
        else:
            raise PermissionDenied()

    def destroy(self, request, *args, **kwargs):
        user: User = self.request.user
        # Verificar si el usuario autenticado es el propietario de la cuenta
        if user.is_admin:
            return super().destroy(request, *args, **kwargs)
        else:
            raise PermissionDenied()
        
    def list(self, request, *args, **kwargs):
        user: User = self.request.user
        if user.is_admin:
            return super().list(request, *args, **kwargs)
        else:
            raise PermissionDenied()
        
    @action(detail=False, methods=["get"])
    def me(self, request):
        user: User = self.request.user
        read = UserSerializer(user)
        return Response({"user": read.data}, status=status.HTTP_200_OK)
    