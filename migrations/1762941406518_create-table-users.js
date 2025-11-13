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
      type: 'VARCHAR(30)',
      notNull: true,
    },
    last_login: {
      type: 'VARCHAR(30)',
    },
  });
};

export const down = (pgm) => {
  pgm.dropTable('users');
};
