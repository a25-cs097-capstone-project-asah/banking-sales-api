const { pool } = require('../config');
const { usersService } = require('../services/postgre');

const seedUsers = async () => {
  try {
    await usersService.generateUsers();
    console.log('users ditambahkan');
    process.exit(0);
  } catch {
    process.exit(1);
  } finally {
    await pool.end();
  }
};

seedUsers();
