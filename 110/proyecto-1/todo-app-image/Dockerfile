FROM nginx

WORKDIR /usr/share/nginx/html

COPY index.html .

CMD $(echo "HOST=${HOST}" >> env) && $(echo "PORT=${PORT}" >> env) && nginx -g "daemon off;"

ENV HOST=localhost
ENV PORT=5000

EXPOSE 80