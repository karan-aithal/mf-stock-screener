<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ yarn install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).


npm install -g @nestjs/cli
nest new mf-backend
yarn add @nestjs/config
yarn add prisma @prisma/client
yarn add -D prisma
yarn prisma init

# JWT and Passport packages
yarn add @nestjs/jwt @nestjs/passport passport passport-jwt
# JWT and Passport packages
yarn add @nestjs/jwt @nestjs/passport passport passport-jwt

# Password hashing
yarn add bcrypt

# Validation packages
yarn add class-validator class-transformer

# TypeScript type definitions
yarn add -D @types/passport-jwt @types/bcrypt


backend (NestJS(framework on Express JS) + Prisma + Postgres)

This canvas contains a ready-to-use backend scaffold implementing:
- Self-hosted JWT auth (email/password) with bcrypt and email verification token
- Users, Portfolios, Holdings, NavHistory Prisma schema
- Portfolio CRUD endpoints (create/list/get/update/delete)
- Holdings CRUD endpoints (add/edit/remove)
- AuthGuard to protect routes
- Docker Compose for Postgres
- Scripts and README for running locally

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { AuthGuard } from '@nestjs/passport';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';





@Moduile
@Get

@Injectable() -- services

import { IsEmail, IsString, MinLength } from 'class-validator';
@IsEmail
@IsString
@MinLength


---------------------------------------------------------
import Controller
Decorator that marks a class as a Nest controller that can receive inbound requests and produce responses.

An HTTP Controller responds to inbound HTTP Requests and produces HTTP Responses. It defines a class that provides the context for one or more related route handlers that correspond to HTTP request methods and associated routes for example GET /api/profile, POST /users/resume.

A Microservice Controller responds to requests as well as events, running over a variety of transports (read more here). It defines a class that provides a context for one or more message or event handlers.

@param prefix
string that defines a route path prefix. The prefix is pre-pended to the path specified in any request decorator in the class.

@see — Routing

@see — Controllers

@see — Microservices

--------------------------------------------------------------

import Injectable
Decorator that marks a class as a provider. Providers can be injected into other classes via constructor parameter injection using Nest's built-in Dependency Injection (DI) system.

When injecting a provider, it must be visible within the module scope (loosely speaking, the containing module) of the class it is being injected into. This can be done by:

defining the provider in the same module scope
exporting the provider from one module scope and importing that module into the module scope of the class being injected into
exporting the provider from a module that is marked as global using the @Global() decorator
Providers can also be defined in a more explicit and imperative form using various custom provider techniques that expose more capabilities of the DI system.

@param options — options specifying scope of injectable

--------------------------------------------------------------------

import Module
Decorator that marks a class as a module.

Modules are used by Nest to organize the application structure into scopes. Controllers and Providers are scoped by the module they are declared in. Modules and their classes (Controllers and Providers) form a graph that determines how Nest performs Dependency Injection (DI).

@param metadata — module configuration metadata

@see — Modules

------------------------------------------------------------------

docker-compose up -d