FROM nginx

WORKDIR /usr/share/nginx/html

CMD $(echo "<h1>Hola soy la máquina: $(hostname)</h1>" > index.html) && nginx -g "daemon off;"

EXPOSE 80