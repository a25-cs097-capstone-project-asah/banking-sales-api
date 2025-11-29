const Jwt = require('jsonwebtoken');
const InvariantError = require('../exceptions/InvariantError');
const AuthenticationError = require('../exceptions/AuthenticationError');

const tokenManager = {
  generateAccessToken: (payload) => {
    return Jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: '1h',
    });
  },
  generateRefreshToken: (payload) => {
    return Jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {
      expiresIn: '30d',
    });
  },
  verifyAccessToken: (payload) => {
    try {
      return Jwt.verify(payload, process.env.ACCESS_TOKEN_KEY);
    } catch (e) {
      // Throw specific errors based on JWT error type
      if (e.name === 'TokenExpiredError') {
        throw new AuthenticationError('Token telah kadaluarsa');
      } else if (e.name === 'JsonWebTokenError') {
        throw new InvariantError('Token tidak valid');
      } else {
        throw new InvariantError('Token verification failed');
      }
    }
  },
  verifyRefreshToken: (payload) => {
    try {
      return Jwt.verify(payload, process.env.REFRESH_TOKEN_KEY);
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        throw new InvariantError('Refresh token telah kadaluarsa');
      } else {
        throw new InvariantError('Refresh token tidak valid');
      }
    }
  },
};

module.exports = tokenManager;
