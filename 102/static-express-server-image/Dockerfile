FROM node:18-alpine

COPY index.js /app/index.js
COPY package.json /app
COPY public/ /app/public/

# Similar a: RUN mkdir -p /app && cd /app
WORKDIR /app

RUN npm install

CMD npm start

EXPOSE 3000