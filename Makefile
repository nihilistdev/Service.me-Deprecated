NPM=npm
NPX=npx
tsc=npm run compile

all:all
	echo "Running npm instal"
	$(NPM) install
	echo "Initial compile"
	$(tsc)

