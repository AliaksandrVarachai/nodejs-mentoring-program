import { DATA_SOURCE, AVAILABLE_DATA_SOURCES } from '../../config/server.js';
import * as pgService from '../services/pg/index.js';
import * as knexService from '../services/knex/index.js';
import wrapImportedMethods from '../middlewares/utils/wrap-imported-methods.js';

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

const loggedServiceProvider = wrapImportedMethods(
  serviceProvider,
  (req, res, methodName, args) => {
    res.trackingInfo = { method: methodName, args };
  },
  () => {}
);

export default loggedServiceProvider;
