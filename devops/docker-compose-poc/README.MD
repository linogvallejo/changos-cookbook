# Docker Compose: React, Node.js, MySQL

Docker offers a solution with its lightweight containers, enabling the isolation of services from our infrastructure and facilitating the rapid delivery of software. In this repository, I'm demoing the process of dockerizing an example application that utilizes React, Node.js Express, and MySQL, utilizing Docker Compose.

The **Usuarios** app (_Users in Spanish_) is a proof of concept (POC) which implements a simple CRUD system that requires three Docker containers:

- React for UI
- Node.js Express for API
- MySQL for database

<h3>Versions utilized:</h3>

- React 18.2
- Node.js 18.16
- MySQL 5.7
- Docker 24.0.2
- Docker Compose 2.18.1
- Nginx 1.25.0
- React Testing Library 14.0.0

<h3>Steps outlined:</h3>

- Create SQL Schema file for MySQL including seed data.
- Create Dockerfile for MySQL
- Setup Nodejs App working with MySQL database.
- Create Dockerfile for Nodejs App.
- Setup React App.
- Create Dockerfile for React App.
- Write Docker Compose configurations in YAML file.
- Set Environment variables in .env file for Docker Compose
- Run Docker Compose

<h3>Environment variables:</h3>

```scala
MYSQLDB_USER=root
MYSQLDB_ROOT_PASSWORD=misha
MYSQLDB_DATABASE=usuarios
MYSQLDB_LOCAL_PORT=3307
MYSQLDB_DOCKER_PORT=3306

NODE_LOCAL_PORT=6868
NODE_DOCKER_PORT=8080

CLIENT_ORIGIN=http://127.0.0.1:8081
CLIENT_API_BASE_URL=http://127.0.0.1:6868/api

REACT_LOCAL_PORT=8081
REACT_DOCKER_PORT=80

REACT_APP_API_BASE_URL=http://localhost:6868/api

```

<h3>Build the POC:</h3>

It's quite easy to run the POC through the command line:

```less
docker-compose up -d --build
```

The _--build_ option is for building Docker images before starting containers.

You can also watch in your terminal what's happening behind the scenes if you use the command:

```less
docker-compose up --build
```

<h3>Stop the POC:</h3>

Stopping all the running containers is very simple with a single command:

```less
docker-compose down
```

If you prefer to stop and remove all containers, networks, and all images used by any service defined in the docker-compose.yml file, use the command:

```less
docker-compose down --rmi all
```

<h3>You're ready to run the POC:</h3>

You will be able to see the React frontend app:
![React frontend app](/assets/usuarios-docker-compose-poc-frontend.png "React frontend app")

You can play with the NodeJS backend API either through the browser or with Postman:
![NodeJS backend API](/assets/usuarios-docker-compose-poc-postman.png "NodeJS backend API")

And you can see the Docker containers and images as well:
![Docker containers and images](/assets/usuarios-docker-compose-poc-containers-and-images.png "Docker containers and images")
