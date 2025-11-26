export const up = (pgm) => {
  pgm.createTable('leads', {
    id: { type: 'VARCHAR(30)', primaryKey: true },
    name: {
      type: 'VARCHAR(80)',
      notNull: true,
    },
    email: {
      type: 'VARCHAR(80)',
      notNull: true,
    },
    locate: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    phone: {
      type: 'VARCHAR(20)',
      notNull: true,
    },
    age: {
      type: 'INTEGER',
      notNull: true,
      default: 0,
    },
    job: {
      type: 'VARCHAR(50)',
      default: 'unknown',
    },
    marital: {
      type: 'VARCHAR(20)',
      default: 'unknown',
    },
    education: {
      type: 'VARCHAR(50)',
      default: 'unknown',
    },
    default: {
      type: 'VARCHAR(10)',
    },
    housing: {
      type: 'VARCHAR(10)',
    },
    loan: {
      type: 'VARCHAR(10)',
    },
    balance: {
      type: 'DECIMAL(15, 2)',
    },
    contact: {
      type: 'VARCHAR(20)',
    },
    month: {
      type: 'VARCHAR(10)',
    },
    day_of_week: {
      type: 'VARCHAR(10)',
    },
    duration: {
      type: 'INTEGER',
    },
    campaign: {
      type: 'INTEGER',
    },
    pdays: {
      type: 'INTEGER',
    },
    previous: {
      type: 'INTEGER',
    },
    poutcome: {
      type: 'VARCHAR(20)',
    },
    emp_var_rate: {
      type: 'DECIMAL(5,2)',
    },
    cons_price_idx: {
      type: 'DECIMAL(6,3)',
    },
    cons_conf_idx: {
      type: 'DECIMAL(5,2)',
    },
    euribor3m: {
      type: 'DECIMAL(6,3)',
    },
    nr_employed: {
      type: 'DECIMAL(8,1)',
    },
    probability_score: {
      type: 'DECIMAL(5,1)',
    },
    prediction_result: {
      type: 'VARCHAR(10)',
    },
    category: {
      type: 'VARCHAR(20)',
    },

    // Portal
    status: {
      type: 'VARCHAR(20)',
      notNull: true,
      default: 'new',
    },
    last_contacted_at: {
      type: 'VARCHAR(30)',
    },
    created_at: {
      type: 'TIMESTAMP',
      notNull: true,
    },
  });

  pgm.createIndex('leads', 'email');
  pgm.createIndex('leads', 'age');
  pgm.createIndex('leads', 'job');
  pgm.createIndex('leads', 'probability_score');
  pgm.createIndex('leads', 'category');
  pgm.createIndex('leads', 'status');
};

export const down = (pgm) => {
  pgm.dropTable('leads');
};
