export const up = (pgm) => {
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
};

export const down = (pgm) => {
  pgm.dropTable('users');
};
