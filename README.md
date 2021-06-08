# carta-cypress

## Build process
Initialise submodules and install package dependencies:
```
git submodule update --init --recursive
npm install
```

## Opening Cypress
```
./node_modules/.bin/cypress open
```
or
```
$(npm bin)/cypress open
```
Then select the *.spec to run.
