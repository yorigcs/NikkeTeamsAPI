# NikkeTeamsAPI

RestFull API with clean architecture to users share teams of the game Nikke.


## Installation

```sh
git clone git@github.com:yorigcs/NikkeTeamsAPI.git && cd NikkeTeamsAPI
```

```sh
npm install
```

## Tests
-unit
```sh
npm run test
```
-integration
```sh
npm run test:integration
```
-coverage
```sh
npm run test:coverage
```

## Usage

### - In dev mode
```sh
npm run prisma:migrate:dev
```
```sh
npm run dev
```

## Notes

Don't forget to config .env and .env.test the same as the .env.example

## Dependencies

- [@prisma/client](https://www.npmjs.com/package/@prisma/client): auto-generated query builder that enables type-safe 
- [bcrypt](https://www.npmjs.com/package/bcrypt): A library to help you hash passwords.
- [cors](https://www.npmjs.com/package/cors): node.js package for providing a Connect/Express middleware
- [dotenv-cli](https://www.npmjs.com/package/dotenv-cli): manage multiple envs
- [express](https://www.npmjs.com/package/express): Fast, unopinionated, minimalist web framework for Node.js.
- [module-alias](https://www.npmjs.com/package/module-alias): Create aliases of directories and register custom module paths in NodeJS
- [reflect-metadata](https://www.npmjs.com/package/reflect-metadata): Metadata Reflection API
- [uuid](https://www.npmjs.com/package/uuid): For the creation of RFC4122 UUIDs


## Dev Dependencies
- [dotenv](https://www.npmjs.com/package/dotenv): Dotenv is a zero-dependency module that loads environment variables from a .env
- [eslint-config-standard-with-typescript](https://www.npmjs.com/package/eslint-config-standard-with-typescript): An ESLint shareable config for TypeScript that is based on eslint-config-standard
- [husky](https://www.npmjs.com/package/husky): Modern native Git hooks made easy
- [lint-staged](https://ghub.io/eslint-plugin-standard): Run linters against staged git files
- [jest](https://www.npmjs.com/package/jest): Delightful JavaScript Testing
- [jest-mock-extended](https://www.npmjs.com/package/jest-mock-extended): Type safe mocking extensions for Jest
- [prisma](https://www.npmjs.com/package/prisma): Prisma is a next-generation ORM
- [supertest](https://www.npmjs.com/package/supertest): HTTP assertions made easy via superagent. Maintained for Forward Email and Lad.
- [ts-jest](https://www.npmjs.com/package/ts-jest): A Jest transformer with source map support that lets you use Jest to test projects written in TypeScript.
- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev): Tweaked version of node-dev that uses ts-node under the hood.
- [typescript](https://www.npmjs.com/package/typescript):  Language for application-scale JavaScript
- [@jest-mock/express](https://www.npmjs.com/package/@jest-mock/express): A lightweight Jest mock for unit testing Express
- [@types/bcrypt](https://www.npmjs.com/package/@types/bcrypt): TypeScript definitions for bcrypt
- [@types/cors](https://www.npmjs.com/package/@types/cors): TypeScript definitions for cors
- [@types/express](https://www.npmjs.com/package/@types/express): TypeScript definitions for express
- [@types/jest](https://www.npmjs.com/package/@types/jest): TypeScript definitions for jest
- [@types/supertest](https://www.npmjs.com/package/@types/supertest): TypeScript definitions for supertest
- [@types/uuid](https://www.npmjs.com/package/@types/uuid): TypeScript definitions for uuid
- [@types/module-alias](https://www.npmjs.com/package/@types/module-alias): TypeScript definitions for module-alias


## License
MIT
