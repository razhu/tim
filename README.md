# DAT enrichment-tim-worker

Project `enrichment-tim-worker` is a worker or processor for Enrichment System that consumes messages from `TimSingleModel` Kafka topic and saves or updates a documentDB, then it produces messages to `TimModel` Kafka topic with the produced changes.

## Testing

For run unit tests, use:

```sh
npm run test
```

## Linting

For check eslint rules, use:

```sh
npm run lint
```

## Development

To clone git repository, use:

```sh
git clone git@github.com:dat-freight-and-analytics/enrichment-tim-worker.git
cd enrichment-tim-worker/
```

Install NPM dependencies, use:

```sh
npm i
```

Update NPM dependencies, use:

```sh
npm run update:dependencies
```

## Transpile

To transpile project TypeScript source code to JavaScript, use:

```sh
npm run build

```

Then the transpile files will be available in `build` folder.

## More Information

- [node.js](https://nodejs.org/en/about/)
- [About NPM](https://www.npmjs.com/about)
- [Docker - Enterprise Container Platform](https://www.docker.com/why-docker)
- [TypeScript JavaScript that scales](http://www.typescriptlang.org/)
