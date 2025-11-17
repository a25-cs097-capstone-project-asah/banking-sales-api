const { Pool } = require('pg');
const UsersService = require('./UsersService');
const AuthenticationsService = require('./AuthenticationsService');
const LeadsService = require('./LeadsService');

// Singleton instance
const pool = new Pool();

const usersService = new UsersService(pool);
const authenticationsService = new AuthenticationsService(pool);
const leadsService = new LeadsService(pool);

module.exports = {
  usersService,
  authenticationsService,
  leadsService,
};
