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
    const query = `SELECT COUNT(*) AS total_leads,
                        COUNT(*) FILTER (WHERE status = 'converted') AS converted_leads,
                        COUNT(*) FILTER (WHERE category = 'high') AS high_priority_leads,
                        ROUND(AVG(probability_score)::numeric, 2) AS average_score,
                        COUNT(*) FILTER (WHERE status = 'follow-up') AS follow_up_leads
                FROM leads`;

    const res = await this._pool.query(query);
    const row = res.rows[0];

    const totalLeads = parseInt(row.total_leads);
    const convertedLeads = parseInt(row.converted_leads);
    const highPriorityLeads = parseInt(row.high_priority_leads);
    const conversionRate =
      totalLeads > 0
        ? parseFloat(((convertedLeads / totalLeads) * 100).toFixed(2))
        : 0;
    const averageScore = parseFloat(row.average_score);
    const followUpLeads = parseInt(row.follow_up_leads);

    return {
      totalLeads,
      convertedLeads,
      highPriorityLeads,
      conversionRate,
      averageScore,
      followUpLeads,
    };
  }

  // Menampilkan data trend konversi dalam kurun 7 hari terakhir
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
