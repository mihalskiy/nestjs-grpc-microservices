#!/bin/bash

cd api-gateway && npm run lint:fix && cd -
cd microservices/users-svc && npm run lint:fix && cd -
