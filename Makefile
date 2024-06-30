DOCKER_COMPOSE = docker-compose

.PHONY: start stop build

start: build
	$(DOCKER_COMPOSE) up --build
	docker exec -it my_nestjs npx prisma migrate dev --name init
stop:
	$(DOCKER_COMPOSE) down

build:
	$(DOCKER_COMPOSE) build
