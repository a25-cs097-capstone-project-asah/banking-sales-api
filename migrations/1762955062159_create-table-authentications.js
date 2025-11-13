export const up = (pgm) => {
  pgm.createTable('authentications', {
    token: {
      type: 'TEXT',
    },
  });
};

export const down = (pgm) => {
  pgm.dropTable('authentications');
};
