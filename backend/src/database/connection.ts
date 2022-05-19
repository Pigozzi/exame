import knex from 'knex';

const configuration = require('../../knexfile');
const database = knex(configuration.development);

export default database;