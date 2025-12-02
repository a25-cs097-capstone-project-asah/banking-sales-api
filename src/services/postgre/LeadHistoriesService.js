const { nanoid } = require('nanoid');
const { leadHistoriesToModel } = require('../../utils/mapDBToModel');

class LeadHistoriesService {
  constructor(pool, cacheService) {
    this._pool = pool;
    this._cacheService = cacheService;
  }

  async addHistory(leadId, userId, action, details) {
    const id = `history-${nanoid(6)}`;
    const createdAt = new Date().toISOString();

    const query = {
      text: `INSERT INTO lead_histories(id, lead_id, user_id, action, details, created_at) 
              VALUES($1, $2, $3, $4, $5, $6) RETURNING id`,
      values: [id, leadId, userId, action, details, createdAt],
    };

    await this._cacheService.del(`leads:${leadId}:histories`);
    await this._pool.query(query);
  }

  async getHistoriesByLeadId(leadId) {
    const cachedHistories = await this._cacheService.get(
      `leads:${leadId}:histories`
    );
    if (cachedHistories) {
      return JSON.parse(cachedHistories);
    }

    const query = {
      text: `SELECT lead_histories.*, users.fullname
             FROM lead_histories
             LEFT JOIN users ON lead_histories.user_id = users.id
             WHERE lead_id = $1
             ORDER BY created_at DESC`,
      values: [leadId],
    };

    const result = await this._pool.query(query);
    const leadHistoryMap = result.rows.map(leadHistoriesToModel);

    await this._cacheService.set(
      `leads:${leadId}:histories`,
      JSON.stringify(leadHistoryMap)
    );
    return leadHistoryMap;
  }

  async getAllHistories() {
    const query = {
      text: `SELECT lead_histories.*, users.username, leads.name as lead_name
             FROM lead_histories
             LEFT JOIN users ON lead_histories.user_id = users.id
             LEFT JOIN leads ON lead_histories.lead_id = leads.id
             ORDER BY created_at DESC`,
    };

    const result = await this._pool.query(query);
    return result.rows.map((row) => ({
      ...leadHistoriesToModel(row),
      leadName: row.lead_name,
    }));
  }
}

module.exports = LeadHistoriesService;
