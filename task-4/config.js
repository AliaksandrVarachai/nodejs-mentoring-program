// List of available data sources
const AVAILABLE_DATA_SOURCES = {
  PG: 'pg',
  KNEX: 'knex'
};

const AVAILABLE_DB_CONNECTIONS = {
  LOCALHOST: 'localhost',
  ELEPHANT_SQL: 'elephantsql'
};

const config = {
  API_PORT: 3000,
  LOG_ERRORS: true,
  AVAILABLE_DATA_SOURCES,
  AVAILABLE_DB_CONNECTIONS,
  DATA_SOURCE: AVAILABLE_DATA_SOURCES.PG,
  DB_CONNECTION: AVAILABLE_DB_CONNECTIONS.LOCALHOST
};

let dbConnectionConfig;
switch (config.DB_CONNECTION) {
  case AVAILABLE_DB_CONNECTIONS.LOCALHOST:
    dbConnectionConfig = {
      DB_HOST: 'localhost',
      DB_PORT: 5432,
      DB_USER: 'task4_user',
      DB_NAME: 'task4_db',
      DB_PASSWORD: '111'
    };
    break;
  case AVAILABLE_DB_CONNECTIONS.ELEPHANT_SQL:
    dbConnectionConfig = {
      DB_HOST: 'balarama.db.elephantsql.com',
      DB_PORT: 5432,
      DB_USER: 'ukjjejmp',
      DB_NAME: 'ukjjejmp',
      DB_PASSWORD: 'lNKRvy0_uhOe4JwCCsyfLtZ23-H8hlTL'
    };
    break;
  default:
    throw Error('Wrong db connection. See AVAILABLE_DB_CONNECTIONS.');
}

/* eslint-disable-next-line prefer-arrow-callback, func-names */
Object.keys(dbConnectionConfig).forEach(function (key) {
  config[key] = dbConnectionConfig[key];
});

module.exports = config;
