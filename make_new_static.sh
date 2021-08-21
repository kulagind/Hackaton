#!/bin/bash
echo" Git checkout master "

git checkout master

echo"Git pull "
git pull

echo" Go to frontend dir "

cd frontend/ || exit

echo"Npm install"
sudo npm install

echo"Npm run build"
npm run build --prod

