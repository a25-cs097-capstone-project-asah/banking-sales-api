const addLeadsToDatabase = require('./addLeadsToDatabase');

const importLeads = async (pool, leads) => {
  const BATCH_SIZE = 100;
  let imported = 0;
  let errors = 0;

  console.log(`Starting import of ${leads.length} leads...`);

  for (let i = 0; i < leads.length; i += BATCH_SIZE) {
    const batch = leads.slice(i, i + BATCH_SIZE);

    try {
      const values = [];
      const placeholders = batch
        .map((lead, idx) => {
          const offset = idx * 32;

          values.push(
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
            lead.createdAt
          );

          const params = Array.from(
            { length: 32 },
            (_, j) => `$${offset + j + 1}`
          ).join(',');

          return `(${params})`;
        })
        .join(',');

      const query = `
        INSERT INTO leads(
          id, name, email, locate, phone, age, job, marital, education,
          "default", housing, loan, balance, contact, month, day_of_week,
          duration, campaign, pdays, previous, poutcome,
          emp_var_rate, cons_price_idx, cons_conf_idx, euribor3m, nr_employed,
          probability_score, prediction_result, category, status,
          last_contacted_at, created_at
        ) VALUES ${placeholders}
        ON CONFLICT(id) DO UPDATE SET
          probability_score = EXCLUDED.probability_score,
          prediction_result = EXCLUDED.prediction_result,
          category = EXCLUDED.category
      `;

      await pool.query(query, values);
      imported += batch.length;

      const progress = Math.round(((i + batch.length) / leads.length) * 100);
      console.log(`Progress: ${progress}% (${imported}/${leads.length})`);
    } catch (error) {
      console.error(`Batch failed at index ${i}:`, error.message);

      console.log('Retrying with single inserts for this batch...');
      for (const lead of batch) {
        try {
          await addLeadsToDatabase(pool, lead);
          imported++;
        } catch (err) {
          console.error(`Failed to import lead ${lead.id}:`, err.message);
          errors++;
        }
      }
    }
  }

  console.log('Import completed!');
  console.log(`   - Successfully imported: ${imported}`);
  console.log(`   - Errors: ${errors}`);
  console.log(`   - Total: ${leads.length}`);

  return { imported, errors };
};

module.exports = { importLeads };
