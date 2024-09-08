module.exports = {
  app: {
    host: 'localhost',
    port: '4000',
  },
  db: {
    mongodb: {
      uri: 'MONGO_URI',
      mongooseOptions: {
        dbName: 'db',
        user: 'user',
        pass: 'pass',
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    },
  },
  cors: {
    origin: [/localhost/],
    credentials: true,
  },
  graphiql: {
    enabled: true,
  },
  jwt: {
    secret: 'defaultsecret',
  },
  mail: {
    link: 'MAIL_LINK',
    user: 'MAIL_USER',
    pass: 'MAIL_PASS',
    port: 'MAIL_PORT',
    secure: 'MAIL_SECURE',
  },
  redis: {
    host: 'REDIS_HOST',
    port: 'REDIS_PORT',
    user: 'REDIS_USERNAME',
    pass: 'REDIS_PASSWORD',
  },
  id24: {
    host: 'ID24_URL',
    key: 'ID24_KEY',
  },
  azure: {
    account_name: 'nimitrcdn',
    client_id: 'AZURE_CLIENT_ID',
    tenant_id: 'AZURE_TENANT_ID',
    client_secret: 'AZURE_CLIENT_SECRET',
    connection_string: 'AZURE_STORAGE_CONNECTION_STRING',
    resource_name: 'nimitrcdn',
    container: 'CONTAINER_AZURE',
    sas_token: 'AZURE_STORAGE_SAS_TOKEN',
  },
  omise: {
    public_key: 'OMISE_PUBLIC_KEY',
    secret_key: 'OMISE_SECRET_KEY',
  },
  frontend: {
    frontend_app_domain: 'FRONTEND_APP_DOMAIN',
  },
}
