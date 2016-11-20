## Regulations API

## Requirements
* node v6 (https://nodejs.org)
* mongoDB v3.2 (https://www.mongodb.com/) (for the parser)

## Configuration

Configuration files are located under `config` dir.  
See Guild https://github.com/lorenwest/node-config/wiki/Configuration-Files

|Name|Description|
|----|-----------|
|`PORT`| The port to listen|
|`API_KEY`| The API KEY from https://api.data.gov/signup/|
|`API_BASE_URL`| The base API URL for regulations api|
|`CACHE_INTERVAL`| The cache interval for API requests|
|`VERBOSE_LOGGING`| The flag if enable debug information|
|`LOAD_PARSER`| The flag if xml files from parser must be loaded|
|`PARSER_OPTIONS`| The parser options. See readme from lrs_parser for details. Currently default options are used.|


## Install dependencies
`npm i`  
install lrs_parser from disk  
`npm i path/to/lrs_parser`  

## Running

|`npm run <script>`|Description|
|------------------|-----------|
|`start`|Serves the app in prod mode.|
|`dev`|Same as `npm start`, but enables nodemon for the server as well.|
|`lint`|Lint all `.js` files.|
|`lint:fix`|Lint and fix all `.js` files. [Read more on this](http://eslint.org/docs/user-guide/command-line-interface.html#fix).|


## Caching
All routes support caching. You must append `?cache=1` param.

## Verification
Postman link https://www.getpostman.com/collections/2de4e6b5131e73024697