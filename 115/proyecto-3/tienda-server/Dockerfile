FROM node:18 as dev

WORKDIR /app

COPY . .

RUN npm install

CMD node .

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl localhost:3000/api/productos || exit 1

EXPOSE 3000

FROM node:18 as test

WORKDIR /app

COPY --from=dev /app .

WORKDIR /app/test

CMD node db.service.test.js && node producto.service.test.js

FROM node:18-alpine as prod

WORKDIR /app

COPY --from=dev /app .

RUN npx -y pkg .

WORKDIR /app/dist

RUN ls 

COPY . /bin

RUN rm -rf /app

WORKDIR /bin

# CMD tienda-server
CMD ls

EXPOSE 3000