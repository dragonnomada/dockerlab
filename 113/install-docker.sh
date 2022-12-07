#!/bin/bash

echo "-- COMIENZA LA INSTALACIÓN DE DOCKER 🐋 ---"

sudo apt update &>/dev/null

echo "-- REGISTRANDO EL REPOSITORIO DE DOCKER 🐋 ---"

sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"

sudo apt update | grep download.docker.com

echo "-- INSTALANDO DOCKER 🐋 ---"

sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

echo "-- VERIFICANDO INSTALACIÓN DE DOCKER 🐋 ---"

docker -v | grep Docker

docker compose --help | grep Usage

docker swarm --help | grep Usage

echo "-- Asignado el usuario al grupo docker 🐋 ---"

sudo usermod -aG docker ${USER}

echo "-- 🐋 Finalizado ---"

echo "Felicidades 🎊🎊🎊, por favor cierra sesión para que tenga efectos"

# sudo chmod +x install-docker.sh