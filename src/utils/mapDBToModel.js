const usersToModel = ({
  id,
  username,
  password,
  fullname,
  email,
  phone,
  role,
  created_at,
  last_login,
}) => ({
  id,
  username,
  password,
  fullname,
  email,
  phone,
  role,
  createdAt: created_at,
  lastLogin: last_login,
});

const leadsToModel = ({
  // personal
  id,
  name,
  email,
  phone,
  age,
  job,
  marital,
  education,
  default: defaultCredit,
  housing,
  loan,
  balance,
  contact,
  month,
  day_of_week,
  duration,
  campaign,
  pdays,
  previous,
  poutcome,

  // economic indicator
  emp_var_rate,
  cons_price_idx,
  cons_conf_idx,
  euribor3m,
  nr_employed,
  probability_score,
  prediction_result,
  category,

  // portal
  status,
  assigned_to,
  last_contacted_at,
  created_at,
}) => ({
  // personal
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
  balance: parseFloat(balance),
  contact,
  month,
  dayOfWeek: day_of_week,
  duration,
  campaign,
  pdays,
  previous,
  poutcome,

  // economic indicator
  empVarRate: emp_var_rate,
  constPriceIdx: cons_price_idx,
  constConfIdx: cons_conf_idx,
  euribor3m,
  nrEmployed: nr_employed,
  probabilityScore: probability_score,
  predictionResult: prediction_result,
  category,

  // portal
  status,
  assignedTo: assigned_to,
  lastContactedAt: last_contacted_at,
  createdAt: created_at,
});

const listLeadToModel = ({
  name,
  email,
  age,
  job,
  probability_score,
  category,
  status,
}) => ({
  name,
  email,
  age,
  job,
  probabilityScore: parseFloat(probability_score),
  category,
  status,
});

const convertionTrendToModel = (leads) => ({
  date: leads.date.toISOString().split('T')[0],
  totalLeads: parseInt(leads.total_leads),
  converted: parseInt(leads.converted),
  convertionRate:
    leads.total_leads > 0
      ? parseFloat((leads.converted / leads.total_leads) * 100)
      : 0,
});

const distributionStatsToModel = (leads) => ({
  category: leads.category,
  count: parseInt(leads.count),
});

module.exports = {
  usersToModel,
  leadsToModel,
  listLeadToModel,
  convertionTrendToModel,
  distributionStatsToModel,
};
