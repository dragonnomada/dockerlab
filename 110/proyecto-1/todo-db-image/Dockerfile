FROM mysql

WORKDIR /docker-entrypoint-initdb.d

COPY install.sql .

# CMD $(mysqld_safe) && --default-authentication-plugin=mysql_native_password mysql -u root todoapp < install.sql

# CMD mysqld --default-authentication-plugin=mysql_native_password

ENV MYSQL_ROOT_PASSWORD=abc123
ENV MYSQL_DATABASE=todoapp