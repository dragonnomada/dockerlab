FROM mysql:5.7

ENV MYSQL_ROOT_PASSWORD=abc123
ENV MYSQL_DATABASE=todoapp

WORKDIR /tmp

COPY install.sql .

# CMD $(mysqld_safe) && --default-authentication-plugin=mysql_native_password mysql -u root todoapp < install.sql

CMD systemctl start mysql