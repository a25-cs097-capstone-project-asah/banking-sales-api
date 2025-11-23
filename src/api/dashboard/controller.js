const asyncHandler = require('../../utils/asyncHandler');
const { dashboardService } = require('../../services/postgre');

/**
 * @api {get} /dashboard/stats Ambil statistik dashboard
 * @apiName GetDashboardStats
 * @apiGroup Dashboard
 *
 * @apiSuccess (200) {Object} stats
 */

const getStatsController = asyncHandler(async (req, res) => {
  const stats = await dashboardService.getStats();

  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});

/**
 * @api {get} /dashboard/charts Ambil statistik chart
 * @apiName GetDashboardCharts
 * @apiGroup Dashboard
 *
 * @apiQuery {Number} days Jumlah hari (default: 7)
 *
 * @apiSuccess (200) {Object[]} convertionTrend
 * @apiSuccess (200) {Object} distributionStats
 */

const getChartController = asyncHandler(async (req, res) => {
  const { days } = req.query;
  const [convertionTrend, distributionStats] = await Promise.all([
    dashboardService.getConvertionTrend(parseInt(days) || 7),
    dashboardService.getDistributionStats(),
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      convertionTrend,
      distributionStats,
    },
  });
});

/**
 * @api {get} /dashboard/priority-leads Ambil leads dengan prioritas tinggi
 * @apiName GetPriorityLeads
 * @apiGroup Dashboard
 *
 * @apiQuery {Number} limit Batas jumlah data (default: 10)
 *
 * @apiSuccess (200) {Object[]} leads
 */

const getPriorityLeads = asyncHandler(async (req, res) => {
  const { limit } = req.query;

  const leads = await dashboardService.getPriorityLeads(parseInt(limit) || 10);

  res.status(200).json({
    status: 'success',
    data: {
      leads,
    },
  });
});

module.exports = {
  getStatsController,
  getChartController,
  getPriorityLeads,
};
