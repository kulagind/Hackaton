#!/bin/bash

git checkout master

git pull

cd frontend/ || exit

sudo npm install

npm run build --prod

