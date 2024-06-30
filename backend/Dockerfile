FROM python:3.10.0

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

RUN apt-get update && apt-get -y install netcat && apt-get -y install gettext

COPY ./requirements.txt /opt/requirements.txt

RUN python -m pip install --upgrade pip
RUN pip install -r /opt/requirements.txt
RUN pip install psycopg2

WORKDIR /code
