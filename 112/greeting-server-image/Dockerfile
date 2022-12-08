# SINXTASIS: FROM <image|stage> AS <stage name> 

ARG NODE_VERSION=18

# Imagen para los Desarrolladores

FROM node:${NODE_VERSION} AS DEV

WORKDIR /app

COPY index.js .
COPY greeting.js .

CMD node .

EXPOSE 3000

# Imagen para los Tester

FROM node:${NODE_VERSION} AS TEST

WORKDIR /test

COPY greeting.js .
COPY greeting.test.js .

CMD node greeting.test.js

# Image Productiva para Debian Linux

FROM node:${NODE_VERSION} AS PROD-linux

COPY --from=DEV /app /app

WORKDIR /app

COPY package.json .

# RUN sed -i "s/node18/node${NODE_VERSION}/g" -f package.json

RUN npm run build

RUN cp dist/greeting-server-image-linux /bin

WORKDIR /bin

RUN rm -rf /app

CMD greeting-server-image-linux

# Imagen Productiva para Alpine Linux

FROM node:${NODE_VERSION}-alpine AS PROD

COPY --from=DEV /app /app

WORKDIR /app

COPY package.json .

# RUN sed -i "s/node18/node${NODE_VERSION}/g" -f package.json

RUN npm run build

RUN cp dist/greeting-server-image-alpine /bin

WORKDIR /bin

RUN rm -rf /app

CMD greeting-server-image-alpine