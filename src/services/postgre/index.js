// Import config
const pool = require('../../config/database');
const transporter = require('../../config/nodeMailer');

// Import service
const UsersService = require('./UsersService');
const AuthenticationsService = require('./AuthenticationsService');
const LeadsService = require('./LeadsService');
const DashboardService = require('./DashboardService');
const NotesService = require('./NotesService');
const LeadHistoriesService = require('./LeadHistoriesService');

// Singleton instance
const usersService = new UsersService(pool);
const authenticationsService = new AuthenticationsService(pool);
const leadHistoriesService = new LeadHistoriesService(pool);
const leadsService = new LeadsService(pool, transporter, leadHistoriesService);
const dashboardService = new DashboardService(pool);
const notesService = new NotesService(pool, leadHistoriesService);

module.exports = {
  usersService,
  authenticationsService,
  leadsService,
  dashboardService,
  notesService,
  leadHistoriesService,
};
