const asyncHandler = require('../../utils/asyncHandler');
const { postValidatePayload } = require('./validator');

const { leadsService } = require('../../services/postgre');

const postLeadController = asyncHandler(async (req, res) => {
  postValidatePayload(req.body);

  const leadId = await leadsService.addLead(req.body);
  res.status(201).json({
    status: 'success',
    message: 'Nasabah berhasil ditambahkan',
    data: {
      leadId,
    },
  });
});

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

module.exports = {
  postLeadController,
  getAllLeadsController,
  getLeadDetailController,
};
