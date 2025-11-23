module.exports = (filters) => {
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

  return { whereSql, values, index };
};
