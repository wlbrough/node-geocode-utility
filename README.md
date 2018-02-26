# Node.js Geocoding Utility

This package takes an input CSV file with one column of address data and returns geocodes from Google's Geocoding API. Only geocodes with a single, complete result having location_type "ROOFTOP" are returned.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

```
node 8.x or greater
```

### Installing

A step by step series of examples that tell you have to get a development env running

Change to the newly project directory

```
$ cd geocoding
```

Install dependencies (only necessary for development)

```
$ npm install
```

Add environment variable containing Geocoding API Key (Optional)

```
$ export GEOCODING_API_KEY=testkey
```

#### IMPORTANT: Add source file to `input` directory

Update config file `config.js`. `maxAPICallsPerSecond` is set to 50, the default for the Google Geocoding service. Update `inputFile` to match the name of the file in the `input` directory.

```
module.exports = {
  apiKey: process.env.GEOCODING_API_KEY,
  maxApiCallsPerSecond: 50,
  inputFile: "Addresses.csv"
};
```

Run the script with the environment variable set

```
$ npm start
```

**or**

Run the script without the environment variable set

```
$ GEOCODING_API_KEY=testkey npm start
```

Output is logged to the console.

## Running the tests

Tests are run with Jest

```
$ npm test
```

To test continuously

```
$ npm run test-watch
```

Lint the project

```
$ npm run lint
```

## Built With

* [Node](https://nodejs.org/en/) - Node and native modules
* [Jest](https://facebook.github.io/jest/) - Testing
* [ESLint](https://eslint.org/) - Linting
* [Prettier](https://prettier.io/) - Code formatting

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
