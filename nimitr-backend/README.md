# NIMITR BACKEND

## Installation

To get started with Nimitr backend, follow these steps:

## Steps

1. Install the dependencies using Yarn:

```bash
yarn install
```

3. Set up the environment variables:

- Set the following environment variable for the development version:

```arduino
PORT=8000
HOST=
MONGO_URI= // MongoDB connection string
MONGO_DBNAME= // MongoDB database
MONGO_USER= // MongoDB username
MONGO_PASS= // MongoDB password
JWT_SECRET=localsecret

FRONTEND_APP_DOMAIN=http://localhost:3000/
MAIL_USER=
MAIL_PASS=
```

4. Start the development server:

```bash
yarn dev
```

## Usage

Once the development server is running, you can open the application in your browser at http://localhost:8000.

## Build

```
//build image
docker-compose  --build

//save image docker to tar
docker save -o d_notice_api.tar d_notice_api
//load
docker load --input d_notice_api.tar

//run
docker run --restart always -p 8070:8070 --env-file .env.prod --name back_api d_notice_api
```

## Getting Started

- Register: Open the frontend application in your browser at http://localhost:3000 and click on the "Register" button to create a new account. After registration, you can log in and start using the application.

- Log In: Use your registered credentials to log in and access the main features of the application.