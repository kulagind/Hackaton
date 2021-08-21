#!/bin/bash

echo "Make migrations"
sudo python3 manage.py makemigrations

echo "Run new migrations"
sudo python3 manage.py migrate
