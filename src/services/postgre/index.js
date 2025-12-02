// Import config
const { pool, transporter } = require('../../config');

// Import service
const UsersService = require('./UsersService');
const AuthenticationsService = require('./AuthenticationsService');
const LeadsService = require('./LeadsService');
const DashboardService = require('./DashboardService');
const NotesService = require('./NotesService');
const LeadHistoriesService = require('./LeadHistoriesService');
const CacheService = require('../redis/CacheService');

// Singleton instance
const cacheService = new CacheService();
const usersService = new UsersService(pool);
const authenticationsService = new AuthenticationsService(pool);
const leadHistoriesService = new LeadHistoriesService(pool, cacheService);
const dashboardService = new DashboardService(pool, cacheService);
const notesService = new NotesService(pool, leadHistoriesService, cacheService);
const leadsService = new LeadsService(
  pool,
  transporter,
  leadHistoriesService,
  cacheService
);

module.exports = {
  usersService,
  authenticationsService,
  leadsService,
  dashboardService,
  notesService,
  leadHistoriesService,
};
