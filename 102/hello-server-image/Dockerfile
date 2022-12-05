# Dockerfile Hello Server

#
# Al estilo bash, podemos crear una especie de SCRIPT 
# llamado el DOCKERFILE, que utilizará Docker para construir una imagen
#

#
# Una imagen es similar a un ambiente de desarrollo estampado,
# es decir, es una estampa de archivos, librerías, comandos y restricciones
# que le dice a Docker cómo se debería generar un Contenedor que contenga
# nuestra aplicación, cómo ejecutarla y que dependencias instalar, partiendo
# de qué sistema operativo, con qué variables de entorno, exponiendo qué puertos,
# bajo que argumentos de ejecución, utilizando qué volúmenes de almacenamiento
# y especificando diferentes etapas de creación.
#

#
# Docker genera imágenes que representan ambientes de desarrollo
# las cuáles se pueden ejecutar como contenedores de aplicaciones y
# administrar los despliegues de aplicación de forma fácil y segura.
#

#
# Algunas directivas comúnes dentro del Dockerfile:
# * `FROM` es la directiva que establece a partir de qué imagen comenzamos el ambiente
#          Generalmente partimos de una imagen ya construida como Ubuntu, Fedora, 
#          NodeJS, MySQL, Nginx, Apache, Spring Tools, etc.
# * `COPY` es la directiva que permite copiar archivos hacía la imagen
# * `RUN` es la directiva que permite ejecutar un comando del sistema operativo de la imagen
#         para que la imagen se construya posterior a la ejecución del comando
# * `CMD` es la directiva que permite ejecutar un comando principal para ejecutar la aplicación,
#         por ejemplo: node hello.js | java HelloApp | mysqld | mongod | nginx -s start | ...
# * `EXPOSE` es la directiva que estable que puertos están siendo utilizados por la aplicación
#         por ejemplo: 3000 | 3001 | 80 | 443 | 22 | ...

# Sintaxis FROM <image>:<tag>

# FROM - Define el sistema operativo base (o el framework base) 
#        a partir del cuál ya tendremos un ambiente

FROM ubuntu:20.04
# FROM node:18
# FROM bitnami/express:latest

# Docker se basa en un sistema de archivos tipo UNIX (tipo linux)
# dónde la raíz es / y ahí encontramos las carpetas clásicas de UNIX:
# /dev /root /bin /usr /etc /mnt /tmp /var /lib

# Si la imagen está basada por ejemplo en Ubuntu 20.04 el sistema de archivos
# contendrá los archivos de un Ubuntu 20.04:
# /boot /lost+found /etc/netplan /etc/apt

# COPY - Copiar archivos externos (a la imagen, pero en el proyecto)
# y colocarlos como archivos del sistema operativo de la imagen
# generando las rutas intermedias que hagan falta (ej. `/app`)

COPY index.js /app/index.js
COPY package.json /app/package.json

# RUN - Ejecutar un comando en la imagen, si se generan archivos, instalan librerías
# o si se modifica algo dentro de la base (sistema operativo / framework), la
# imagen resultante será nuestro ambiente de la aplicación ya configurado

RUN echo "ACTUALIZANDO EL SISTEMA OPERATIVO..."

RUN apt update

RUN echo "INSTALANDO curl..."

RUN apt install -y curl

RUN echo "REGISTRANDO NODE JS 18.x..."

RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -

RUN echo "INSTALANDO NODE JS 18.x..."

RUN apt install nodejs

RUN echo "VERIFICANDO NODE JS 18.x..."

RUN node -v

RUN npm -v

# NOTA: Podríamos seguir ejecutando comando para configurar el ambiente
#       de la aplicación, por ejemplo, si necesita Node JS, Express JS, etc
# EJEMPLO: RUN npm install express

# CMD - Ejecuta el comando principal para levantar la aplicación 
# (el comando de despliegue)

CMD npm start
# CMD node . &
# CMD node index.js
# CMD sh run.sh
# CMD node -v && node index.js
# CMD sh tweets.sh & && node .
# CMD sh build.sh && node index.js
# CMD ["sh", "...", "..."]

# RUN -> TIEMPO DE CONSTRUCCIÓN DE IMAGEN vs CMD -> TIEMPO DE EJECUCIÓN DEL CONTENEDOR

# RUN -> LLENAR EL BARRIL
# CALL -> SERVIR EL BARRIL

# EXPOSE - Reserva el puerto especificado sobre el sistema húesped

EXPOSE 3000

# Docker se basa en dos sistemas:
# Sistema base (Anfitrión / Hospedador / Host) alberga a los contenedores (Ej. Windows 11)
# Sistema contenido (Contenedor / Húesped / Container / Subsystem)

# El objetivo de Docker es ejecutar de manera aislada contenedores
# que tengan su propio sistema operativo base (sus propios códigos y librerías)
# y transferir los servicios web expuestos en los puertos.
# Es decir, Docker ejecuta subsistemas independientes y comunica los TCP/UDP
# entre el contenedor (lo que se ejecuta / ambiente en ejecución)
# y el anfitrión (el que tiene los recursos físicos / máquina / servidor)

# Docker es un mecanismo para transferir Arquitecturas de Desarrollo y Ambientes
# de Desarrollo, Pruebas y Ejecución a Imágenes inmutables, versionables y
# seguras, con sus propios recursos, para automatizar los despliegues y ejecuciones.

#
# Docker está optimizado para ejecutar cientos de contenedores en una máquina con
# características limitadas, como un servidor o una pc de desarrollo.
# De tal manera que no consumirá mayores recursos por ejecutar varios linux
# dentro de un windows/linux/mac como sí lo haría una máquina virtual.
# Tenemos las ventajas de una máquina virtual que está aislada del resto
# de máquinas, pero sin la desventaja de consumir muchos (muchísimos) recursos. 
#

#
# Construir una imagen a partir del Dockerfile:
# cd <path> && docker image build Dockerfile 
# docker image build <path>/Dockerfile
#
# SINTAXIS: docker [image] build .
# SINTAXIS: docker [image] build <path/Dockerfile>
#

#
# IMPORTANTE: Todos los comando RUN servirán para crear la imagen
#             por lo que deben ser comando desatendidos.
#             Si el comando necesita una confirmación (tipo Y/N)
#             o algún dato que necesite ser escrito, la construcción
#             se dentendrá y la imagen no podrá construirse.
#