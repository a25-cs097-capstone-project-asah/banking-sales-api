const {
  jobTranslation,
  maritalTranslation,
  educationTranslation,
  contactTranslation,
  monthTranslation,
  daysTranslation,
  poutcomeTranslation,
  yesNoTranslation,
  translateValue,
  categoryTranslation,
  statusTranslation,
} = require('./translations');

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
  probability_score,
  prediction_result,
  category,
  status,

  last_contacted_at,
  created_at,
}) => ({
  id,
  name,
  email,
  phone,
  age,
  job: translateValue(job, jobTranslation),
  marital: translateValue(marital, maritalTranslation),
  education: translateValue(education, educationTranslation),
  defaultCredit: translateValue(defaultCredit, yesNoTranslation),
  housing: translateValue(housing, yesNoTranslation),
  loan: translateValue(loan, yesNoTranslation),
  balance,
  contact: translateValue(contact, contactTranslation),
  month: translateValue(month, monthTranslation),
  dayOfWeek: translateValue(day_of_week, daysTranslation),
  duration,
  campaign,
  pdays,
  previous,
  poutcome: translateValue(poutcome, poutcomeTranslation),
  probabilityScore: probability_score,
  predictionResult: prediction_result,
  category: translateValue(category, categoryTranslation),
  status: translateValue(status, statusTranslation),
  lastContactedAt: last_contacted_at,
  createdAt: created_at,
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

const notesToModel = (row) => ({
  leadId: row.lead_id,
  userId: row.user_id,
  body: row.body,
  createdAt: row.created_at,
  createdBy: {
    fullname: row.fullname,
    role: row.role,
  },
});

module.exports = {
  usersToModel,
  leadsToModel,
  convertionTrendToModel,
  distributionStatsToModel,
  notesToModel,
};
