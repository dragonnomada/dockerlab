FROM node:18 as dev

WORKDIR /

RUN npx -y create-react-app /app

WORKDIR /app

COPY . .

RUN npm install

RUN npm run start

EXPOSE 3000