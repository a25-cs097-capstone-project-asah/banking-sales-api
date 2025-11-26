const transformMLRow = require('./transformMLRow');

const transformMLData = (rawData) => {
  console.log('Starting Transfer data');
  return rawData
    .map((row) => {
      try {
        return transformMLRow(row);
      } catch {
        return null;
      }
    })
    .filter((lead) => lead !== null);
};

module.exports = transformMLData;
