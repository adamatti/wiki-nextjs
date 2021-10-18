
clean-app:
	rm -rf .next
	rm -rf coverage

clean:
	rm -rf node_modules

run:
	yarn dev

lint:
	yarn lint

deps:
	docker-compose up -d

test:
	yarn test

build:
	yarn build

check: lint test build

clean-run: clean-app run