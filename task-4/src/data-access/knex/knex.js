import knex from 'knex';
import { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } from '../../../config';

export default knex({
  client: 'pg',
  connection: {
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD
  },
  debug: false
});
