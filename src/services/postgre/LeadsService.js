// Import utils
const { leadsToModel } = require('../../utils/mapDBToModel');

// Import error handling
const NotFoundError = require('../../exceptions/NotFoundError');
const leadsFilter = require('../../utils/leadsFilter');

class LeadsService {
  constructor(pool) {
    this._pool = pool;
  }

  // Fitur menampilkan seluruh lead/calon nasabah
  // sebanyak 10 nasabah per page.
  async getAllLeads({ page, limit, sortBy, order, filters }) {
    const allowSortBy = [
      'probability_score',
      'category',
      'status',
      'job',
      'name',
    ];
    const allowOrder = ['DESC', 'ASC'];
    if (!allowSortBy.includes(sortBy)) {
      sortBy = 'probability_score';
    }

    if (!allowOrder.includes(order)) {
      order = 'DESC';
    }

    const { whereSql, values, index } = leadsFilter(filters);
    const startIndex = (page - 1) * limit;

    const countQuery = {
      text: `SELECT COUNT(*) AS total_leads FROM leads ${whereSql}`,
      values: values,
    };

    const countResult = await this._pool.query(countQuery);
    const totalLeads = parseInt(countResult.rows[0].total_leads);

    const query = {
      text: `SELECT name, email, age, job, probability_score, category, status  
              FROM leads ${whereSql}
              ORDER BY ${sortBy} ${order}
              LIMIT $${index} OFFSET $${index + 1}`,
      values: [...values, limit, startIndex],
    };

    const result = await this._pool.query(query);
    return {
      leads: result.rows.map(leadsToModel),
      pagination: {
        page,
        limit,
        totalLeads,
        totalPages: Math.ceil(totalLeads / limit),
      },
    };
  }

  // Fitur menampilkan detail dari lead/calon nasabah
  async getLeadsDetail(id) {
    const query = {
      text: `SELECT id, name, email, phone, age, 
                    job, marital, education, housing, loan, 
                    balance, contact, month, day_of_week, duration, 
                    probability_score, prediction_result, category, status,
                    last_contacted_at, created_at
             FROM leads WHERE id = $1`,
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Nasabah gagal ditampilkan. Id tidak ditemukan');
    }

    return leadsToModel(result.rows[0]);
  }

  async exportLeads(filters) {
    const { whereSql, values } = leadsFilter(filters);

    const query = {
      text: `SELECT * FROM leads ${whereSql} ORDER BY probability_score DESC`,
      values: [...values],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = LeadsService;
