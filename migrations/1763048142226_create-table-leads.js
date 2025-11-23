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
    phone: {
      type: 'VARCHAR(20)',
      notNull: true,
    },

    // Dari Dataset
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
      type: 'DECIMAL(5,2)',
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

  pgm.sql(`
    INSERT INTO leads (
      id, name, email, phone, age, job, marital, education,
      "default", housing, loan, balance, contact, month, day_of_week,
      duration, campaign, pdays, previous, poutcome,
      emp_var_rate, cons_price_idx, cons_conf_idx, euribor3m, nr_employed,
      probability_score, prediction_result, category, status, created_at
    ) VALUES
      ('lead-a8f3k9m2', 'Andi Setiawan', 'andi@email.com', '+62 812-3456-7891', 42, 'management', 'married', 'university.degree', 'no', 'yes', 'no', 95000000, 'cellular', 'may', 'tue', 195, 1, 999, 0, 'nonexistent', 1.1, 93.994, -36.4, 4.857, 5191, 78, 'yes', 'medium', 'new', '2025-11-15T08:23:45.000Z'),
      ('lead-b2j7p4n1', 'Sari Kusuma', 'sari@email.com', '+62 813-2345-6789', 28, 'student', 'single', 'high.school', 'yes', 'no', 'no', 18000000, 'cellular', 'may', 'tue', 83, 9, 999, 1, 'failure', -1.8, 92.893, -46.2, 1.344, 5099.1, 32, 'no', 'low', 'new', '2025-11-13T09:15:22.000Z'),
      ('lead-c9m4k8t3', 'Budi Hartono', 'budi@email.com', '+62 814-3456-7890', 51, 'entrepreneur', 'married', 'university.degree', 'no', 'yes', 'no', 175000000, 'cellular', 'sep', 'fri', 328, 2, 3, 1, 'success', -3.4, 92.379, -29.8, 0.809, 5017.5, 89, 'yes', 'high', 'contacted', '2025-11-11T14:30:18.000Z'),
      ('lead-d5n2l7p9', 'Dewi Anggraini', 'dewi@email.com', '+62 815-4567-8901', 35, 'admin', 'single', 'university.degree', 'no', 'yes', 'yes', 68000000, 'cellular', 'sep', 'fri', 73, 2, 999, 0, 'nonexistent', -3.4, 92.379, -29.8, 0.803, 5017.5, 64, 'yes', 'medium', 'follow-up', '2025-11-11T11:45:33.000Z'),
      ('lead-e7k3m9t1', 'Rudi Santoso', 'rudi@email.com', '+62 816-5678-9012', 46, 'blue-collar', 'married', 'basic.4y', 'unknown', 'yes', 'yes', 42000000, 'telephone', 'may', 'mon', 440, 1, 999, 0, 'nonexistent', 1.1, 93.994, -36.4, 4.857, 5191, 48, 'no', 'low', 'new', '2025-11-11T07:20:55.000Z'),
      ('lead-f1p8n4k2', 'Fitri Rahmawati', 'fitri@email.com', '+62 817-6789-0123', 33, 'services', 'divorced', 'high.school', 'yes', 'yes', 'no', 55000000, 'cellular', 'sep', 'fri', 56, 2, 999, 0, 'nonexistent', -3.4, 92.379, -29.8, 0.803, 5017.5, 58, 'no', 'low', 'contacted', '2025-11-10T16:10:40.000Z'),
      ('lead-g6t2m7l4', 'Wahyu Firmansyah', 'wahyu@email.com', '+62 818-7890-1234', 39, 'technician', 'married', 'professional.course', 'no', 'yes', 'no', 82000000, 'cellular', 'sep', 'fri', 166, 1, 999, 0, 'nonexistent', -3.4, 92.379, -29.8, 0.803, 5017.5, 71, 'yes', 'medium', 'follow-up', '2025-11-08T13:25:12.000Z'),
      ('lead-h3k9p5n8', 'Linda Permata', 'linda@email.com', '+62 819-8901-2345', 29, 'admin', 'single', 'university.degree', 'no', 'no', 'no', 48000000, 'cellular', 'may', 'tue', 85, 8, 999, 0, 'nonexistent', -1.8, 92.893, -46.2, 1.344, 5099.1, 52, 'no', 'low', 'new', '2025-11-18T07:40:27.000Z'),
      ('lead-i8m4t1k6', 'Hendra Gunawan', 'hendra@email.com', '+62 820-9012-3456', 54, 'management', 'married', 'university.degree', 'no', 'yes', 'yes', 142000000, 'cellular', 'sep', 'fri', 520, 1, 999, 0, 'nonexistent', -3.4, 92.379, -29.8, 0.803, 5017.5, 85, 'yes', 'high', 'contacted', '2025-11-07T15:55:03.000Z'),
      ('lead-j2n7l3p9', 'Ratna Sari', 'ratna@email.com', '+62 821-0123-4567', 26, 'student', 'single', 'high.school', 'no', 'yes', 'yes', 22000000, 'cellular', 'sep', 'thu', 733, 1, 3, 1, 'success', -3.4, 92.379, -29.8, 0.809, 5017.5, 28, 'no', 'low', 'new', '2025-11-07T08:12:48.000Z'),
      ('lead-k5t8m2n4', 'Agus Prasetyo', 'agus@email.com', '+62 822-1234-5678', 48, 'services', 'married', 'basic.9y', 'unknown', 'no', 'no', 88000000, 'telephone', 'may', 'mon', 198, 1, 999, 0, 'nonexistent', 1.1, 93.994, -36.4, 4.857, 5191, 73, 'yes', 'medium', 'follow-up', '2025-11-06T12:35:19.000Z'),
      ('lead-l9p3k7t1', 'Nina Wijaya', 'nina@email.com', '+62 823-2345-6789', 37, 'technician', 'married', 'professional.course', 'no', 'yes', 'no', 76000000, 'cellular', 'sep', 'thu', 167, 1, 3, 2, 'success', -3.4, 92.379, -29.8, 0.809, 5017.5, 68, 'yes', 'medium', 'converted', '2025-11-06T09:50:44.000Z'),
      ('lead-m4n6l8p2', 'Dedi Kurniawan', 'dedi@email.com', '+62 824-3456-7890', 52, 'retired', 'married', 'basic.9y', 'unknown', 'yes', 'yes', 92000000, 'telephone', 'sep', 'thu', 174, 1, 999, 0, 'nonexistent', -3.4, 92.379, -29.8, 0.803, 5017.5, 75, 'yes', 'medium', 'new', '2025-11-06T14:22:36.000Z'),
      ('lead-n1k5m9t7', 'Yuni Puspita', 'yuni@email.com', '+62 825-4567-8901', 31, 'services', 'single', 'high.school', 'no', 'no', 'no', 52000000, 'cellular', 'may', 'tue', 71, 2, 999, 0, 'nonexistent', -1.8, 92.893, -46.2, 1.344, 5099.1, 55, 'no', 'low', 'follow-up', '2025-11-06T11:18:55.000Z'),
      ('lead-o7t2p4n3', 'Bambang Susilo', 'bambang@email.com', '+62 826-5678-9012', 45, 'blue-collar', 'married', 'basic.6y', 'no', 'yes', 'no', 58000000, 'telephone', 'may', 'mon', 353, 1, 999, 0, 'nonexistent', 1.1, 93.994, -36.4, 4.857, 5191, 61, 'no', 'low', 'contacted', '2025-11-05T16:45:21.000Z'),
      ('lead-p3m8k1l6', 'Sri Mulyani', 'sri@email.com', '+62 827-6789-0123', 40, 'management', 'married', 'university.degree', 'no', 'no', 'no', 115000000, 'cellular', 'may', 'tue', 281, 2, 999, 0, 'nonexistent', -1.8, 92.893, -46.2, 1.344, 5099.1, 81, 'yes', 'high', 'new', '2025-11-06T08:33:42.000Z'),
      ('lead-q9n4t7p5', 'Fajar Ramadhan', 'fajar@email.com', '+62 828-7890-1234', 27, 'student', 'single', 'unknown', 'no', 'no', 'no', 25000000, 'cellular', 'sep', 'thu', 72, 2, 999, 0, 'nonexistent', -3.4, 92.379, -29.8, 0.809, 5017.5, 35, 'no', 'low', 'new', '2025-11-05T13:28:17.000Z'),
      ('lead-r5k2m3n8', 'Rina Oktavia', 'rina@email.com', '+62 829-8901-2345', 36, 'admin', 'divorced', 'high.school', 'yes', 'no', 'no', 62000000, 'cellular', 'may', 'tue', 159, 2, 999, 1, 'failure', -1.8, 92.893, -46.2, 1.344, 5099.1, 59, 'no', 'low', 'contacted', '2025-11-01T10:15:38.000Z'),
      ('lead-s1p7t9k4', 'Herman Wijaya', 'herman@email.com', '+62 830-9012-3456', 49, 'services', 'married', 'basic.9y', 'no', 'no', 'no', 85000000, 'telephone', 'may', 'mon', 226, 1, 999, 0, 'nonexistent', 1.1, 93.994, -36.4, 4.857, 5191, 72, 'yes', 'medium', 'follow-up', '2025-11-01T15:42:09.000Z'),
      ('lead-t8n3l5m2', 'Lilis Suryani', 'lilis@email.com', '+62 831-0123-4567', 34, 'technician', 'single', 'professional.course', 'no', 'yes', 'no', 71000000, 'cellular', 'sep', 'thu', 531, 1, 999, 0, 'nonexistent', -3.4, 92.379, -29.8, 0.803, 5017.5, 66, 'yes', 'medium', 'converted', '2025-10-31T12:55:24.000Z'),
      ('lead-u4k9p2t6', 'Bruce Wayne', 'bruce@email.com', '+62 832-1234-5678', 56, 'entrepreneur', 'married', 'university.degree', 'no', 'yes', 'no', 195000000, 'cellular', 'sep', 'fri', 104, 2, 999, 0, 'nonexistent', -3.4, 92.379, -29.8, 0.803, 5017.5, 92, 'yes', 'high', 'contacted', '2025-10-30T09:20:51.000Z'),
      ('lead-v2m5n8k1', 'Putri Maharani', 'putri@email.com', '+62 833-2345-6789', 30, 'admin', 'single', 'university.degree', 'no', 'yes', 'no', 54000000, 'cellular', 'may', 'tue', 369, 2, 999, 1, 'failure', -1.8, 92.893, -46.2, 1.344, 5099.1, 57, 'no', 'low', 'follow-up', '2025-10-30T14:38:15.000Z'),
      ('lead-w7t1p4n9', 'Teguh Santoso', 'teguh@email.com', '+62 834-3456-7890', 43, 'management', 'married', 'professional.course', 'no', 'yes', 'no', 128000000, 'cellular', 'sep', 'fri', 181, 1, 999, 0, 'nonexistent', -3.4, 92.379, -29.8, 0.803, 5017.5, 83, 'yes', 'high', 'new', '2025-10-28T11:12:47.000Z'),
      ('lead-x3k6m2l5', 'Siti Aisyah', 'siti@email.com', '+62 835-4567-8901', 25, 'student', 'single', 'high.school', 'yes', 'yes', 'no', 19000000, 'cellular', 'may', 'tue', 50, 1, 999, 0, 'nonexistent', 1.1, 93.994, -36.4, 4.857, 5191, 30, 'no', 'low', 'contacted', '2025-10-27T08:45:33.000Z'),
      ('lead-y9p8t3n7', 'Eko Prasetyo', 'eko@email.com', '+62 836-5678-9012', 50, 'blue-collar', 'married', 'basic.6y', 'no', 'yes', 'yes', 65000000, 'telephone', 'may', 'mon', 307, 1, 999, 0, 'nonexistent', 1.1, 93.994, -36.4, 4.857, 5191, 62, 'no', 'low', 'new', '2025-10-30T16:22:58.000Z'),
      ('lead-z5n2k7m4', 'Maya Sari', 'maya@email.com', '+62 837-6789-0123', 38, 'services', 'married', 'high.school', 'no', 'no', 'no', 79000000, 'telephone', 'may', 'mon', 149, 1, 999, 0, 'nonexistent', 1.1, 93.994, -36.4, 4.857, 5191, 69, 'yes', 'medium', 'follow-up', '2025-10-26T13:50:19.000Z'),
      ('lead-a1t9p5k8', 'Rahmat Hidayat', 'rahmat@email.com', '+62 838-7890-1234', 55, 'retired', 'married', 'basic.4y', 'unknown', 'yes', 'no', 98000000, 'telephone', 'may', 'mon', 261, 1, 999, 0, 'nonexistent', 1.1, 93.994, -36.4, 4.857, 5191, 76, 'yes', 'medium', 'contacted', '2025-10-28T10:35:42.000Z'),
      ('lead-b6m3n1l2', 'Indah Permatasari', 'indah@email.com', '+62 839-8901-2345', 32, 'technician', 'single', 'professional.course', 'yes', 'no', 'no', 67000000, 'cellular', 'sep', 'thu', 380, 1, 999, 0, 'nonexistent', -3.4, 92.379, -29.8, 0.803, 5017.5, 63, 'yes', 'medium', 'new', '2025-10-27T15:18:26.000Z'),
      ('lead-c4k7t8p9', 'Dani Firmansyah', 'dani@email.com', '+62 840-9012-3456', 47, 'management', 'divorced', 'university.degree', 'no', 'yes', 'no', 135000000, 'cellular', 'may', 'tue', 304, 2, 999, 1, 'failure', -1.8, 92.893, -46.2, 1.344, 5099.1, 84, 'yes', 'high', 'follow-up', '2025-10-27T12:44:51.000Z'),
      ('lead-d2p5m9n3', 'Wati Susilowati', 'wati@email.com', '+62 841-0123-4567', 29, 'admin', 'single', 'high.school', 'no', 'yes', 'no', 46000000, 'cellular', 'sep', 'thu', 224, 1, 999, 1, 'failure', -3.4, 92.379, -29.8, 0.809, 5017.5, 51, 'no', 'low', 'contacted', '2025-10-21T09:28:37.000Z');
  `);
};

export const down = (pgm) => {
  pgm.dropTable('leads');
};
