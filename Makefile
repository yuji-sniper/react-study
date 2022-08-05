# Docker
build:
	docker-compose build
up:
	docker-compose up -d
down:
	docker-compose down

# コンテナ
react:
	docker exec -it react-app /bin/sh

# React
react-install:
	docker compose run --rm react-app sh -c "yarn global add create-react-app && yarn create react-app . --template typescript"

# yarn
yarn-ci:
	docker compose run --rm react-app yarn install --immutable --immutable-cache --check-cache

# 初期化
init:
	@make build
	@make yarn-ci
	@make up
