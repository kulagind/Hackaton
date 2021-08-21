FROM python:3.7

COPY . /srv/www/rostelecom
WORKDIR /srv/www/rostelecom

RUN pip install -r requirements.txt
