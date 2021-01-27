lint:
	npx eslint .

test:
	npx -n --experimental-vm-modules jest --watch

test-coverage:
	npm test -- --coverage --coverageProvider=v8