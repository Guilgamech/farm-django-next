# Sistema de gestion de reservacion de locales en la Universidad de Camaguey

## Instalación
- `cp .env.template .env` omando para crear el environment(can be changed)
- `docker build -t web-granja ./backend` comando para crear la imagen del backend
- `docker exec -it web-granja bash`
- `python manage.py makemigrations`
- `python manage.py createsuperuser`