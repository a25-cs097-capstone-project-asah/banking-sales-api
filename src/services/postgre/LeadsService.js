// Import utils
const { leadsToModel } = require('../../utils/mapDBToModel');
const leadsFilter = require('../../utils/leadsFilter');
const { verifySortOrder, verifyStatus } = require('../../utils/getLeadsHelper');

// Import error handling
const NotFoundError = require('../../exceptions/NotFoundError');
const emailFormatSender = require('../../utils/emailFormatSender');
const InvariantError = require('../../exceptions/InvariantError');

class LeadsService {
  constructor(pool, transporter, leadHistoriesService, cacheService) {
    this._pool = pool;
    this._transporter = transporter;
    this._leadHistoriesService = leadHistoriesService;
    this._cacheService = cacheService;
  }

  // Fitur menampilkan seluruh lead/calon nasabah
  // sebanyak 10 nasabah per page.
  async getAllLeads({ page, limit, sortBy, order, filters }) {
    const { sortBy: validatedSort, order: validatedOrder } = verifySortOrder(
      sortBy,
      order
    );

    const startIndex = (page - 1) * limit;
    const { whereSql, values, index } = leadsFilter(filters);

    const query = {
      text: `SELECT id, name, email, age, job, probability_score, category, status  
              FROM leads ${whereSql}
              ORDER BY ${validatedSort} ${validatedOrder}
              LIMIT $${index} OFFSET $${index + 1}`,
      values: [...values, limit, startIndex],
    };

    const countQuery = {
      text: `SELECT COUNT(*) AS total_leads FROM leads ${whereSql}`,
      values: values,
    };

    const [result, countResult] = await Promise.all([
      this._pool.query(query),
      this._pool.query(countQuery),
    ]);

    const leads = result.rows.map(leadsToModel);
    const totalLeads = parseInt(countResult.rows[0].total_leads);

    return {
      leads,
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
      text: `SELECT id, name, email, locate, phone, age, 
                    job, marital, education, "default", housing, loan, 
                    balance, contact, month, day_of_week, duration, 
                    probability_score, prediction_result, category, status,
                    last_contacted_at, customer_duration, created_at
             FROM leads WHERE id = $1`,
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Nasabah gagal ditampilkan. Id tidak ditemukan');
    }

    return leadsToModel(result.rows[0]);
  }

  // Menampilkan daftar leads prioritas
  async getPriorityLeads({ page, limit, sortBy, order }) {
    const { sortBy: validatedSort, order: validatedOrder } = verifySortOrder(
      sortBy,
      order
    );

    const startIndex = (page - 1) * limit;
    const baseFilter = `
      category = 'high'
      AND status NOT IN ('converted', 'rejected')
    `;

    const query = {
      text: `
        SELECT id, name, email, age, job, probability_score, category, status
        FROM leads
        WHERE ${baseFilter}
        ORDER BY ${validatedSort} ${validatedOrder}
        LIMIT $1 OFFSET $2
      `,
      values: [limit, startIndex],
    };

    const countQuery = {
      text: `
        SELECT COUNT(*) AS total_leads
        FROM leads
        WHERE ${baseFilter}
      `,
    };

    const [result, countResult] = await Promise.all([
      this._pool.query(query),
      this._pool.query(countQuery),
    ]);

    const leads = result.rows.map(leadsToModel);
    const totalLeads = parseInt(countResult.rows[0].total_leads) || 0;

    return {
      leads,
      pagination: {
        page,
        limit,
        totalLeads,
        totalPages: Math.ceil(totalLeads / limit),
      },
    };
  }

  async updateLeadStatusById(leadId, status, userId) {
    const { status: validStatus, lastContactedAt } = verifyStatus(status);

    const query = {
      text: `
        UPDATE leads 
        SET status = $1, last_contacted_at = $2
        WHERE id = $3 
        RETURNING id
      `,
      values: [validStatus, lastContactedAt, leadId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui status. Id tidak ditemukan');
    }

    await this._leadHistoriesService.addHistory(
      leadId,
      userId,
      'UPDATE_STATUS',
      `Status updated to ${validStatus}`
    );

    await this._cacheService.del('stats');
    await this._cacheService.del('distribution_stats');

    return result.rows[0].id;
  }

  async sendEmailToLead(leadId, userId) {
    const lead = await this.getLeadsDetail(leadId);
    const emailFormat = emailFormatSender(lead);

    try {
      await this._transporter.sendMail(emailFormat);
    } catch (error) {
      throw new InvariantError('Gagal mengirim email', error.message);
    }

    await this._leadHistoriesService.addHistory(
      leadId,
      userId,
      'EMAIL_SENT',
      'Deposit email sent'
    );
  }

  // Export daftar leads dalam format CSV
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
