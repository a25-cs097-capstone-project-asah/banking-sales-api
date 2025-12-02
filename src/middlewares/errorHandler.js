const ClientError = require('../exceptions/ClientError');

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  if (error instanceof ClientError) {
    return res.status(error.statusCode).json({
      status: 'fail',
      message: error.message,
    });
  }

  // error duplikat username
  if (e.code === '23505') {
    return res.status(400).json({
      status: 'fail',
      message: 'Username sudah digunakan.',
    });
  }

  // error tak terduga
  console.log(e);
  res.status(500).json({
    status: 'error',
    message: 'Terjadi kegagalan pada server kami.',
  });
};

module.exports = errorHandler;
