.PHONY: build
build:
	@echo "Building..."
	@npm run build
	@npm run package

.PHONY: test
test:
	@echo "Testing..."
	@npm run test