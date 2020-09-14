#!/bin/bash

cd api-gateway && npm run copy:protos && npm run build && cd -
cd microservices/users-svc && npm run copy:protos && npm run build && cd -
docker-compose build --no-cache
