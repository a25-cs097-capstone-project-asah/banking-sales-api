// Import database
const pool = require('../../config/database');

// Import service
const UsersService = require('./UsersService');
const AuthenticationsService = require('./AuthenticationsService');
const LeadsService = require('./LeadsService');
const DashboardService = require('./DashboardService');

// Singleton instance
const usersService = new UsersService(pool);
const authenticationsService = new AuthenticationsService(pool);
const leadsService = new LeadsService(pool);
const dashboardService = new DashboardService(pool);

module.exports = {
  usersService,
  authenticationsService,
  leadsService,
  dashboardService,
};
