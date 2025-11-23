require('dotenv').config();
const bcrypt = require('bcrypt');
const { userPass } = require('../src/config/environment');

const up = async (pgm) => {
  pgm.createTable('users', {
    id: {
      type: 'VARCHAR(30)',
      primaryKey: true,
    },
    username: {
      type: 'VARCHAR(50)',
      notNull: true,
      unique: true,
    },
    password: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    fullname: {
      type: 'VARCHAR(80)',
      notNull: true,
    },
    email: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    phone: {
      type: 'VARCHAR(20)',
      notNull: true,
    },
    role: {
      type: 'VARCHAR(20)',
      notNull: true,
    },
    created_at: {
      type: 'TIMESTAMP',
      notNull: true,
    },
  });

  const password = userPass;
  const hashedPassword = await bcrypt.hash(password, 10);
  const createdAt = new Date().toISOString();

  pgm.sql(
    `INSERT INTO users(id, username, password, fullname, email, phone, role, created_at) VALUES 
      ('user-c9m7k8t3', 'Driyan', '${hashedPassword}', 'Adriyan', 'adrian@email.com', '+62 851-2233-4455', 'sales', '${createdAt}'),
      ('user-x1234abc', 'BunaTed', '${hashedPassword}', 'Buna Teddy', 'buna@teddy.com', '+62 812-0000-1111', 'sales', '${createdAt}')`
  );
};

const down = (pgm) => {
  pgm.dropTable('users');
};

module.exports = {
  up,
  down,
};
