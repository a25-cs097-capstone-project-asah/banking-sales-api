const addLeadsToDatabase = async (pool, lead) => {
  const query = {
    text: `
      INSERT INTO leads(
        id, name, email, locate, phone, age, job, marital, education,
        "default", housing, loan, balance, contact, month, day_of_week,
        duration, campaign, pdays, previous, poutcome,
        emp_var_rate, cons_price_idx, cons_conf_idx, euribor3m, nr_employed,
        probability_score, prediction_result, category, status,
        last_contacted_at, created_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,
        $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23,
        $24, $25, $26, $27, $28, $29, $30, $31, $32
      ) ON CONFLICT(id) DO UPDATE SET
        probability_score = EXCLUDED.probability_score,
        prediction_result = EXCLUDED.prediction_result,
        category = EXCLUDED.category
    `,
    values: [
      lead.id,
      lead.name,
      lead.email,
      lead.locate,
      lead.phone,
      lead.age,
      lead.job,
      lead.marital,
      lead.education,
      lead.default,
      lead.housing,
      lead.loan,
      lead.balance,
      lead.contact,
      lead.month,
      lead.dayOfWeek,
      lead.duration,
      lead.campaign,
      lead.pdays,
      lead.previous,
      lead.poutcome,
      lead.empVarRate,
      lead.consPriceIdx,
      lead.consConfIdx,
      lead.euribor3m,
      lead.nrEmployed,
      lead.probabilityScore,
      lead.predictionResult,
      lead.category,
      lead.status,
      lead.lastContactedAt,
      lead.createdAt,
    ],
  };

  await pool.query(query);
};

module.exports = addLeadsToDatabase;
