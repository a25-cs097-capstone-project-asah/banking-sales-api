const {
  distributionStatsToModel,
  convertionTrendToModel,
} = require('../../utils/mapDBToModel');

class DashboardService {
  constructor(pool) {
    this._pool = pool;
  }

  // Fitur menampilkan statistik pada dashboard
  async getStats() {
    const query = {
      /* eslint-disable */
      totalLeads: 'SELECT COUNT(*) AS total_leads FROM leads',
      convertedLeads:
        "SELECT COUNT(*) AS total_leads FROM leads WHERE status = 'converted'",
      highPriorityLeads:
        "SELECT COUNT(*) AS total_leads FROM leads WHERE category = 'high'",
      averageScore:
        'SELECT ROUND(AVG(probability_score)::numeric, 2) AS average FROM leads',
      /* eslint-enable */
    };

    const [
      totalLeadsResult,
      convertedLeadsResult,
      highPriorityLeadsResult,
      averageScoreResult,
    ] = await Promise.all([
      this._pool.query(query.totalLeads),
      this._pool.query(query.convertedLeads),
      this._pool.query(query.highPriorityLeads),
      this._pool.query(query.averageScore),
    ]);

    const totalLeads = parseInt(totalLeadsResult.rows[0]?.total_leads) || 0;
    const convertedLeads =
      parseInt(convertedLeadsResult.rows[0]?.total_leads) || 0;
    const highPriorityLeads =
      parseInt(highPriorityLeadsResult.rows[0]?.total_leads) || 0;
    const convertionRate =
      totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(2) : 0;
    const averageScore = parseFloat(averageScoreResult.rows[0].average || 0);

    return {
      totalLeads,
      convertedLeads,
      highPriorityLeads,
      convertionRate: parseFloat(convertionRate),
      averageScore,
    };
  }

  async getConvertionTrend(days = 7) {
    const result = await this._pool.query(
      `WITH date_series AS(
          SELECT generate_series(
            CURRENT_DATE - INTERVAL '${days - 1} days',
            CURRENT_DATE, '1 days'::interval
          )::date AS date
        )
        SELECT date_series.date,
        COALESCE(COUNT(leads.id), 0) AS total_leads,
        COALESCE(COUNT(CASE WHEN leads.status = 'converted' THEN 1 END), 0) AS converted
        FROM date_series LEFT JOIN leads
        ON DATE(leads.created_at::timestamp) = date_series.date
        GROUP BY date_series.date
        ORDER BY date_series.date ASC`
    );

    return result.rows.map(convertionTrendToModel);
  }

  // Menampilkan persentase leads berdasarkan kategori pada pie chart
  async getDistributionStats() {
    const result = await this._pool.query(
      `SELECT category, COUNT(*) AS count
        FROM leads WHERE category IS NOT NULL
        GROUP BY category
        ORDER BY CASE category
          WHEN 'high' THEN 1
          WHEN 'medium' THEN 2
          WHEN 'low' THEN 3
      END`
    );

    return result.rows.map(distributionStatsToModel);
  }
}

module.exports = DashboardService;
