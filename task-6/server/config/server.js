import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// List of available data sources
export const AVAILABLE_DATA_SOURCES = {
  PG: 'pg',
  KNEX: 'knex'
};

export const AVAILABLE_DB_CONNECTIONS = {
  LOCALHOST: 'localhost',
  ELEPHANT_SQL: 'elephantsql'
};

export const API_PORT = 3000;
export const LOG_ERRORS = true;
export const DATA_SOURCE = AVAILABLE_DATA_SOURCES.KNEX;
export const DB_CONNECTION = AVAILABLE_DB_CONNECTIONS.ELEPHANT_SQL;
export const LOG_DIR_PATH = path.resolve(__dirname, '../logs');
export const SECRET = 'secret';
export const ACCESS_TOKEN_TTL = 600;    // sec
export const REFRESH_TOKEN_TTL = 6000;   // sec

let dbConnectionConfig;
switch (DB_CONNECTION) {
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

export const DB_HOST = dbConnectionConfig.DB_HOST;
export const DB_PORT = dbConnectionConfig.DB_PORT;
export const DB_USER = dbConnectionConfig.DB_USER;
export const DB_NAME = dbConnectionConfig.DB_NAME;
export const DB_PASSWORD = dbConnectionConfig.DB_PASSWORD;
