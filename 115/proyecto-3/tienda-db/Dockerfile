FROM mysql AS test

WORKDIR /docker-entrypoint-initdb.d

COPY *.sql .

WORKDIR /

COPY init.sh .
COPY docker-entrypoint.sh .

CMD ./init.sh

EXPOSE 3306

FROM mysql AS prod

WORKDIR /docker-entrypoint-initdb.d

COPY 1_install .

WORKDIR /

COPY init.sh .

CMD ls

EXPOSE 3306