// List of available data sources
const AVAILABLE_DATA_SOURCES = {
  POSTGRES: 'postgres',
  MEMORY: 'memory'
};

module.exports = {
  API_PORT: 3000,
  LOG_ERRORS: true,
  AVAILABLE_DATA_SOURCES,
  DATA_SOURCE: AVAILABLE_DATA_SOURCES.MEMORY,
  DB_HOST: 'localhost',
  DB_PORT: 5432,
  DB_USER: 'task3_user',
  DB_NAME: 'task3_db',
  DB_PASSWORD: '111'
};
