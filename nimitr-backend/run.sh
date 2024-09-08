docker-compose build
docker run --restart always -p 8000:8000 --env-file .env.prod --name nimitr_backend nimitr-backend-api