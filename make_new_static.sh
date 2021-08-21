#!/bin/bash

git checkout master

git pull

#cd frontend/ || exit
#
#sudo npm install
#
#npm run build --prod
#
#cd ..
#
#sudo rm -r static/
#
#mkdir static
#
#cp -r frontend/dist/Design/*  static/

docker-compose build

docker-compose up -d
