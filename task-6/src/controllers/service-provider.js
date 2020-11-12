import { DATA_SOURCE, AVAILABLE_DATA_SOURCES } from '../../config/server';
import * as pgService from '../services/pg';
import * as knexService from '../services/knex';

const serviceProvider = (() => {
  switch (DATA_SOURCE) {
    case AVAILABLE_DATA_SOURCES.PG:
      return pgService;
    case AVAILABLE_DATA_SOURCES.KNEX:
      return knexService;
    default:
      throw Error(`Data source "${DATA_SOURCE}" is unknown.`);
  }
})();

export default serviceProvider;
