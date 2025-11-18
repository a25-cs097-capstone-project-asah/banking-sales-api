const asyncHandler = require('../../utils/asyncHandler');
const { dashboardService } = require('../../services/postgre');

const getStatsController = asyncHandler(async (req, res) => {
  const stats = await dashboardService.getStats();

  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});

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
