# Docker Workflow

## 1. Conterenizar la arquitectura del proyecto mediante *Dockerfile*

Los proyecto de desarrollo, pruebas y producción generalmente parten de código fuente y ambientes de ejecución que deben estar preparados para que nuestro proyecto tenga base de ejecución (`bootfs/os` y `modules/libs`).

> Ejemplo de la aquitectura del código fuente para un proyecto de React JS

```txt
...
node_modules/
src/
  App.js
  index.js
  ...
package.json
...
```

> Ejemplo de los módulos y librerías para un proyecto de React JS

```txt
node
npm
npx
npx create-react-app
...
```

> Ejemplo de los módulos y librerías para un proyecto de Flask con Python

```txt
python3
pip3
pip3 install Flask
apt install curl
...
```

Podemos generar un archivo `Dockerfile` que copie la arquitectura del código fuente y prepare el entorno de ejecución en diferentes `Stages` para poder determinar diferentes ambientes de ejecución (`dev`, `test`, `prod`, `docs`, etc).

```dockerfile
ARG <name>=<default value>

FROM <image>:<tag> AS <stage>

WORKDIR <work path>

COPY <context source path> <container target path>

RUN <command> [<args...>]

CMD <main command> [<args...>]

EXPOSE <container port to publish>

ENV <environment variables>

HEALTHCHECK --interval <period> <health command> || exit <code>

FROM <image>:<tag> AS <other stage>

COPY --from=<prev state> <prev stage source path> <current stage target path>

RUN <command> [<args...>]

CMD <main command> [<args...>]

EXPOSE <container port to publish>

ENV <environment variables>
```

Docker CLI | Descripción
--- | ---
`docker build . -t <image>:<tag>` | Construye una nueva imagen con el `Dockerfile` de la carpeta actual.
`docker create --name=<container name> -p <hport>:<cport> <image>:<tag>` | Crea una imagen sin inicializarla (`docker container start <container name>`).
`docker run -itp <hport>:<cport> <image>:<tag>` | Ejecuta de forma interactiva la imagen con su comando principal.
`docker run -itp <hport>:<cport> <image>:<tag> <command>` | Ejecuta de forma interactiva la imagen con un comando personalizado
`docker run -dp <hport>:<cport> ...` | La opción `-d` ejecuta en modo *detach* el contenedor impidiendo que la terminal se bloquee.
`docker exec -it <container> <commando>` | Ejecuta dentro de un `<container>` el comando y el resultado lo maneja sobre la terminal de forma interactiva.
`docker tag <image>:<tag> <repository>/<image>:<tag>` | Reetiqueta una imagen a otra para poder prepararla hacía el *Docker Hub*.
`docker push <repository>/<image>:<tag>` | Sube la imagen al repositorio del *Docker Hub* si tenemos permisos (`docker login`).
`docker pull <repository>/<image>:<tag>`
`docker container ls` | Lista los contenedores en ejecución
`docker container ls -a` | Lista todos los contenedores
`docker ps` | Lista los contenedores en ejecución
`docker ps -a` | Lista todos los contenedores
`docker ps -q` | Lista todos los *ID* contenedores (`docker stop $(docker ps -a -q)` o `docker rm $(docker ps -a -q)` equivalente a `docker container prune`)`.
`docker image ls` | Lista las imágenes
`docker container inspect <container>` | Muestra la información del contenedor tipo *json*.
`docker image inspect <image>:<tag>` | Muestra la información de la imagen tipo *json*.

## 2. Componer conterenizaciones mediante *Docker Compose*

Para poder orquestar despliegues de múltiples contenedores podemos establecer el archivo `compose.yaml` para que a través de *Docker Compose* hagamos una *auto-administración* de los recursos usados por los contenedores.

*Docker Compose* tiene el objetivo de seguir las instrucciones definidas en el archivo `.yaml` y determinar levantar o dar baja un conjunto de contenedores.

**Nota:** *Docker Compose* no levantará servicios, pero a tráves de *Docker Stack* si lo hará. Los servicios permiten distrubuir la ejecución (*carga de trabajo*) mediante *Docker Swarm* en los diferentes *nodos* de un *clúster*.

> Ejemplo de un conjunto de contenedores administrados mediante un `.yaml`

```yaml
version: "<version | 3>"

services:
    <service name>:
        <image>: <repository>/<image>:<tag>
        # build:
        #     context: <path to Dockerfile>
        #     dockerfile: <dockerfile name | Dockerfile>
        #     target: <stage>  
        # volumes:
        #     <mount name>:
        #         ... options
        volumes: # --volume -v
            - "<volume name>:<container path>:ro"
            - "<host path>:<container path>"
        # networks: # --subnet --ip-range
        #     <network name>
        #         ipv4address: <ip valid in ip-range>
        networks:
            - "<network name>"
        ports: # Cuándo no hay replicas podemos asignar un puerto
            - "<hport>:<cport>"
        restart: <always|on-failure|none|on-complete>
        deploy:
            type: <replicated|...>
            # replicas: <number>
            resources:
                reservations:
                    cpus: <min couta cpus>
                    memory: <min couta memory>
                limits:
                    cpus: <max couta cpus>
                    memory: <max couta memory>

# volumes:
#     <mount name>:
#         type: <volume | bind | tmpfs>
#         ... options

volumes:
    - <volume name>
    - <other volume name>

# networks:
#     <network name>:
#         ipam:
#             driver: <default | host | null>
#             config:
#                 - subnet: "<net mask>/16"
#                   ip_range: "<ip mask>/24"
#         ... extra

networks:
    - <network name>
    - <other network name>
```

Docker CLI | Descripción
--- | ---
`docker network create <network name>` | Crea una nueva red
`docker network create --driver=<bridge/host/null> --subnet=<net mask> --ip-range=<ip mask> <network name>` | Crea una nueva red con configuraciones específicas
`docker volume create <volume name>` | Crea un nuevo volumen
`docker volume create --type=<volume|bind|tmpfs [...options] <volume name>` | Crea un nuevo volumen con opciones personalizadas
`docker network ls / inspect <network name>` | Inspeciona las redes
`docker volume ls / inspect <volume name>` | Inspeciona los volúmenes
`docker compose up -d` | Levanta un conjunton de contenedores según el `compose.yaml`
`docker compose -f <path .yaml> up -d` | Levanta un conjunto de contenedores según el `<path .yaml>`
`docker compose down` | Da de baja el conjunto de contenedores y libera sus recursos (`docker stop -> docker rm`).
`docker compose ls / top / logs` | Monitorean los contenedores orquestados

## 3. Generar un clúster de contenedores mediante *Docker Swarm*

Podemos configurar diferentes *hosts* que ejecuten *Docker* y algunos asuman el rol de *Manager* y el de *Worker*.

Los nodos tipo *Manager* nos permitirán levantar contenedores y los tipo *Worker* ejecutarlos.

Docker CLI | Descripción
--- | ---
`docker swarm init [...options]` | Convierte el *host* en un nodo *Manager*
`docker swarm join-token worker/manager` | Recupera el comando con todo y token
`docker swarm join <<token>> <<ip:port>>` | Agrega en el *Manager* un nodo en modo *worker* o *manager* según el `<<token>>`
`docker service create --name <service name> [...options] <image>:<tag>` | Levanta un contenedor como servicios (en los nodos de *Docker Swarm*) al estilo `docker run`
`docker service ls / inspect <service name>`
`docker stack deploy --compose-file <path .yaml> <stack name>` | **Levanta contenedores en forma de servicios** definidos por el archivo de *Docker Compose* `<path .yaml>`. Esta es la forma más utilizada para administrar servicios y contenedores en el *clúster*.

**IMPORTANTE:** Cuándo los nodos *Manager* y *Worker* no se encuentren dentro de la misma subred debemos usar la combinación de la opción `--advertise-addr=<public ip>:<*port>` y `--listen-addr=0.0.0.0:<*port>` para que los *Workers* y el *Manager* tenegan comunicación externa. No es lo ideal pero es lo práctico.