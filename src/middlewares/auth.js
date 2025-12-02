const tokenManager = require('../utils/tokenManager');
const AuthenticationError = require('../exceptions/AuthenticationError');
const InvariantError = require('../exceptions/InvariantError');

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new AuthenticationError('Authentication dibutuhkan!');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new InvariantError('Token tidak ditemukan');
    }

    const decoded = tokenManager.verifyAccessToken(token);
    req.userId = decoded.id;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
