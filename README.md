# Getting Started with RS4

## NOTE

it seems that the client folders was not added with this repository , the problem comes from create react app which comes with its own git repository so that the react application was not added with this repository,
I readded it to another repository to keep this repository a time-valid submittion because I had to create a new git repository to add the client code and can not add it to this repository
link: https://github.com/mohammadalbasha/itPlust24-fxing-client-adding-problem

## Available Scripts

In the project directory, you can run:

### `docker-compose up --build`

this will build the necessery images and run backend, frontend, postgres containers

## Web Application

after the containers is running
visit http://localhost:3000

## Environemnt variables

they should be added to the .env file as described in the env tepmlate

## Technlogies

Nest.js - typescipt for backend service - the Base Controller architecture was applied

Reactjs for frontend service

postgres as a database

prisma as an ORM

i18n for emails translation

Casl for Authorization and routes protection
