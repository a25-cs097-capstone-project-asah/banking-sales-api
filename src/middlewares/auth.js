const tokenManager = require('../utils/tokenManager');
const AuthenticationError = require('../exceptions/AuthenticationError');
const InvariantError = require('../exceptions/InvariantError');

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new AuthenticationError('woppp mana tokennya💪😠🫵?!');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new InvariantError('Token tidak provided');
    }

    const decoded = tokenManager.verifyAccessToken(token);
    req.userId = decoded.id;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = auth;
