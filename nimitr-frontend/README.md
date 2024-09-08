# NIMITR FRONTEND

## Installation

To get started with Nimitr frontend, follow these steps:

## Quick start

You may run "docker compose up" straight to start the frontend.   The front end will be available at localhost:8080




## Development Mode 

1. Install the dependencies using Yarn:

```bash
yarn install
```

2. Set up the environment variables:

- Set the following environment variable for the development version in .env file:
```arduino
REACT_APP_GRAPHQLSUBSCRIPTION=ws://localhost:8000/graphql
REACT_APP_GRAPHHTTP=http://localhost:8000/graphql

REACT_APP_UPLOAD_MARKER=http://localhost:8000/uploadmarker
REACT_APP_UPLOAD_MEDIA=http://localhost:8000/uploadmedia
REACT_APP_DELETE_MEDIA=http://localhost:8000/deletemedia
REACT_APP_UPLOAD_PATTERN=http://localhost:8000/uploadpattern
REACT_APP_GENERAT_QR=http://localhost:8000/generateqr
REACT_APP_GET_MARKER=http://localhost:8000/api/v1/markers

REACT_APP_DOMAIN=http://localhost:8000

REACT_APP_API_STATUS_200="200"
```
- `http://localhost:8000` This's from backend endpoint

3. Start the development server:
```bash
yarn start
```

## Usage
Once the development server is running, you can open the application in your browser at http://localhost:3000.

## Getting Started

- Register: Click on the "Register" button on the homepage to create a new account. After registration, you can log in and start using the application.

- Log In: Use your registered credentials to log in and access the main features of the application.
