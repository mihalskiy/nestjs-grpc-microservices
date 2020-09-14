# NestJS GraphQL API + gRPC microservices and Jest

This project is a [monorepo](https://gomonorepo.org/) containing a [GraphQL](https://graphql.org/) API with [gRPC](https://grpc.io/) back-end microservices built using the [NestJS framework](https://nestjs.com/). This project is mainly used for learning/trial and boilerplate purposes only.

## Architecture Overview
 
The GraphQL API acts as a gateway/proxy for the different microservices it exposes. The resolvers of the GraphQL API make calls to the gRPC microservices through client-server communication. The services and the data interchange are defined using [Protocol Buffers](https://developers.google.com/protocol-buffers/). The gRPC microservices handle and fulfill the requests whether they are database or storage operations or any other internal or external calls. Also added unit-test with help Jest

### API Layer

[NestJS + GraphQL](https://nestjs.com/) acts as the API Layer for the architecture. It takes care of listening for client requests and calling the appropriate back-end microservice to fulfill them.

### Microservice Layer

[NestJS + gRPC](https://grpc.io/) was chosen as the framework to do the microservices. [Protocol buffers](https://developers.google.com/protocol-buffers/) was used as the data interchange format between the client (GraphQL API) and the server (gRPC microservices). NestJS is still the framework used to create the gRPC Microservices.

### Persistence Layer

PostgreSQL is used as the database and [Sequelize](https://sequelize.org) is used as the Object-Relational Mapper (ORM).

## How to Run

### Pre-requisites

You must install the following on your local machine:

1. Node.js (v12.x recommended)
2. Docker
3. Docker Compose
4. PostgreSQL Client (libpq as required by [pg-native](https://www.npmjs.com/package/pg-native#install))

### Running

1. On the Terminal, go into the project's root folder (`cd /project/root/folder`) and execute `npm start`. The start script will install all npm dependencies for all projects, lint the code, transpile the code, build the artifacts (Docker images) and run all of them via `docker-compose`.

2. Once the start script is done, the GraphQL Playground will be running on [http://localhost:3000](http://localhost:3000)

## Roadmap

### API Gateway

* [x] Add unit tests

### Microservices

* [ ] Add caching
* [ ] Add health checks
* [x] Add unit tests
* [ ] Improve logging
* [ ] Improve error handling
