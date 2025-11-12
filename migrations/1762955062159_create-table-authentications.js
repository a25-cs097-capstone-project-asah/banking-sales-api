export const up = (pgm) => {
  pgm.createTable('authentications', {
    token: {
      type: 'VARCHAR(60)',
    },
  });
};

export const down = (pgm) => {
  pgm.dropTable('authentications');
};
