const { config, pool } = require('../../config');
const fetchMLData = require('./helpers/fetchMLData');
const transformMLData = require('./helpers/transformMLData');
const { importLeads } = require('./helpers/importLeads');

const mlAPI = config.ml.serviceUrl;

const importMLAPI = async () => {
  try {
    const rawData = await fetchMLData(mlAPI);
    const leads = transformMLData(rawData);
    const { imported, errors } = await importLeads(pool, leads);

    await pool.end();
    return { success: imported, errors };
  } catch (error) {
    await pool.end();
    throw new Error(error.message);
  }
};

importMLAPI()
  .then(() => {
    process.exit(0);
  })
  .catch(() => {
    process.exit(1);
  });
