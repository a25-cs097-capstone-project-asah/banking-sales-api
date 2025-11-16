// Import nanoid untuk generate id random
const { nanoid } = require('nanoid');

// Import utils
const { leadsToModel, listLeadToModel } = require('../../utils/mapDBToModel');

// Import error handling
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class LeadsService {
  constructor(pool) {
    this._pool = pool;
  }

  // Fitur menambahkan lead/calon nasabah (hanya sebagai fitur testing)
  async addLead(leadData) {
    const id = `lead-${nanoid(8)}`;
    const createdAt = new Date().toISOString();

    const {
      name,
      email,
      phone,
      age,
      job,
      marital,
      education,
      defaultCredit,
      housing,
      loan,
      balance,
      contact,
      month,
      dayOfWeek,
      duration,
      campaign,
      pdays,
      previous,
      poutcome,
      empVarRate,
      consPriceIdx,
      consConfIdx,
      euribor3m,
      nrEmployed,
      probabilityScore,
      predictionResult,
      category,
      status = 'new',
    } = leadData;

    const query = {
      text: `INSERT INTO leads (
        id, name, email, phone, age, job, marital, education,
        "default", housing, loan, balance, contact, month, day_of_week,
        duration, campaign, pdays, previous, poutcome,
        emp_var_rate, cons_price_idx, cons_conf_idx, euribor3m, nr_employed,
        probability_score, prediction_result, category, status,
        created_at
      ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30) 
      RETURNING id`,
      values: [
        id,
        name,
        email,
        phone,
        age,
        job,
        marital,
        education,
        defaultCredit,
        housing,
        loan,
        balance,
        contact,
        month,
        dayOfWeek,
        duration,
        campaign,
        pdays,
        previous,
        poutcome,
        empVarRate,
        consPriceIdx,
        consConfIdx,
        euribor3m,
        nrEmployed,
        probabilityScore,
        predictionResult,
        category,
        status,
        createdAt,
      ],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new InvariantError('Nasabah gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  // Fitur menampilkan seluruh lead/calon nasabah
  // sebanyak 10 nasabah per page.
  async getAllLeads({ page, limit, sortBy, order, filters }) {
    const where = []; // Menampung string kondisi WHERE
    const values = []; // Menampung parameterized query
    let index = 1; // Index untuk PostgreSQL placeholder

    // filter berdasarkan category
    if (filters.category) {
      where.push(`category = $${index++}`);
      values.push(filters.category);
    }

    // filter berdasarkan status
    if (filters.status) {
      where.push(`status = $${index++}`);
      values.push(filters.status);
    }

    // filter berdasarkan job
    if (filters.job) {
      where.push(`job = $${index++}`);
      values.push(filters.job);
    }

    // filter berdasarkan minimum score
    if (filters.minScore) {
      where.push(`probability_score >= $${index++}`);
      values.push(filters.minScore);
    }

    // filter berdasarkan maximum score
    if (filters.maxScore) {
      where.push(`probability_score <= $${index++}`);
      values.push(filters.maxScore);
    }

    // filter berdasarkan pencarian
    if (filters.search) {
      where.push(`name ILIKE $${index}`);
      values.push(`%${filters.search}%`);
      index++;
    }

    const whereSql = where.length > 0 ? `WHERE ${where.join(' AND ')}` : '';
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
      leads: result.rows.map(listLeadToModel),
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
      text: 'SELECT * FROM leads WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Nasabah gagal ditampilkan. Id tidak ditemukan');
    }

    return leadsToModel(result.rows[0]);
  }
}

module.exports = LeadsService;
