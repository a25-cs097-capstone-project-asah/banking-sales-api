const { Parser } = require('json2csv');

const asyncHandler = require('../../utils/asyncHandler');

const { leadsService } = require('../../services/postgre');
const { translatedLeads, leadFields } = require('../../utils/getLeadsUtils');

/**
 * @api {get} /leads Ambil semua leads
 * @apiName GetAllLeads
 * @apiGroup Leads
 *
 * @apiQuery {Number} page
 * @apiQuery {Number} limit
 * @apiQuery {String} sortBy
 * @apiQuery {String} order
 * @apiQuery {String} category
 * @apiQuery {String} status
 * @apiQuery {String} job
 * @apiQuery {Number} minScore
 * @apiQuery {Number} maxScore
 * @apiQuery {String} search
 *
 * @apiSuccess (200) {Object[]} leads
 * @apiSuccess (200) {Object} pagination
 */

const getAllLeadsController = asyncHandler(async (req, res) => {
  const {
    page,
    limit,
    sortBy,
    order,
    category,
    status,
    job,
    minScore,
    maxScore,
    search,
  } = req.query;

  const result = await leadsService.getAllLeads({
    page: parseInt(page) || 1,
    limit: parseInt(limit) || 10,
    sortBy: sortBy || 'probability_score',
    order: order || 'DESC',
    filters: {
      category,
      status,
      job,
      minScore: minScore ? parseFloat(minScore) : undefined,
      maxScore: maxScore ? parseFloat(maxScore) : undefined,
      search,
    },
  });
  res.status(200).json({
    status: 'success',
    data: {
      leads: result.leads,
      pagination: result.pagination,
    },
  });
});

/**
 * @api {get} /leads/:id Ambil detail lead
 * @apiName GetLeadDetail
 * @apiGroup Leads
 *
 * @apiParam {String} id ID Lead
 *
 * @apiSuccess (200) {Object} lead
 */

const getLeadDetailController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const lead = await leadsService.getLeadsDetail(id);
  res.status(200).json({
    status: 'success',
    data: {
      lead,
    },
  });
});

/**
 * @api {get} /leads/priority-leads Ambil leads dengan prioritas tinggi
 * @apiName GetPriorityLeads
 * @apiGroup leads
 *
 * @apiQuery {Number} page Halaman data
 * @apiQuery {Number} limit Batas jumlah data (default: 10)
 *
 * @apiSuccess (200) {Object[]} leads
 * @apiSuccess (200) {Object} pagination
 */

const getPriorityLeads = asyncHandler(async (req, res) => {
  const { page, limit, sortBy, order } = req.query;

  const result = await leadsService.getPriorityLeads({
    page: parseInt(page) || 1,
    limit: parseInt(limit) || 10,
    sortBy: sortBy || 'probability_score',
    order: order || 'DESC',
  });

  res.status(200).json({
    status: 'success',
    data: {
      leads: result.leads,
      pagination: result.pagination,
    },
  });
});

/**
 * @api {get} /leads/exports Export semua leads ke CSV
 * @apiName ExportLeads
 * @apiGroup Leads
 *
 * @apiQuery {String} category
 * @apiQuery {String} status
 * @apiQuery {String} job
 * @apiQuery {Number} minScore
 * @apiQuery {Number} maxScore
 * @apiQuery {String} search
 *
 * @apiSuccess (200) {File} CSV
 */

const exportLeadsController = asyncHandler(async (req, res) => {
  const { category, status, job, minScore, maxScore, search } = req.query;

  const leads = await leadsService.exportLeads({
    filters: {
      category,
      status,
      job,
      minScore: minScore ? parseFloat(minScore) : undefined,
      maxScore: maxScore ? parseFloat(maxScore) : undefined,
      search,
    },
  });

  const data = leads.map(translatedLeads);
  const fields = leadFields;

  const parser = new Parser({ fields, delimiter: ';' });
  const csv = parser.parse(data);

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=leads-export.csv');
  res.status(200).send(csv);
});

module.exports = {
  getAllLeadsController,
  getLeadDetailController,
  getPriorityLeads,
  exportLeadsController,
};
