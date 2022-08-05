# Docker
build:
	docker-compose build
up:
	docker-compose up -d

# コンテナ
react:
	docker exec -it react-app /bin/sh

# React
react-install:
	docker compose run --rm react-app yarn global add create-react-app && npx create-react-app app --template typescript
yarn-ci:
	docker compose run --rm react-app yarn install --immutable --immutable-cache --check-cache

# 初期化
init:
	@make build
	@make react-install
	@make up
