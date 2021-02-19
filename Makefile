install:
	npm install

link:
	npm link

test:
	npx -n --experimental-vm-modules jest

test-watch:
	npx -n --experimental-vm-modules jest --watch

lint:
	npx eslint .

test-coverage:
	npx -n --experimental-vm-modules jest --coverage