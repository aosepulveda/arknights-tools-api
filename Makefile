ROOT_DIR:=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))
NAME:=arknights-api

build:
	@echo "Building Docker $(NAME) image..."
	@docker build -t $(NAME):latest .

build-debug:
	@echo "Building Docker $(NAME) image..."
	@docker build -f debug.Dockerfile -t $(NAME):latest .

debug: build-debug
	@docker run \
			-p 4000:4000 \
			-p 9229:9229 \
			-v $(ROOT_DIR)/src:/usr/src/app/src \
			--entrypoint npm \
			$(NAME):latest \
			run start

run: build
	@docker run \
			-d \
			-p 4000:4000 \
			$(NAME):latest
