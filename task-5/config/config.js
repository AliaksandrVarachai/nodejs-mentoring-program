const path = require('path');

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
  DATA_SOURCE: AVAILABLE_DATA_SOURCES.KNEX,
  DB_CONNECTION: AVAILABLE_DB_CONNECTIONS.ELEPHANT_SQL,
  LOG_DIR_PATH: path.resolve(__dirname, '../logs')
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
      DB_HOST: 'lallah.db.elephantsql.com',
      DB_PORT: 5432,
      DB_USER: 'eyitbcuz',
      DB_NAME: 'eyitbcuz',
      DB_PASSWORD: 'l0s94pXG_P63mKfrIWwfLMApeSt3eoq8'
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
