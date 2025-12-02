const Jwt = require('jsonwebtoken');
const InvariantError = require('../exceptions/InvariantError');
const AuthenticationError = require('../exceptions/AuthenticationError');
const { config } = require('../config');

const tokenManager = {
  generateAccessToken: (payload) => {
    return Jwt.sign(payload, config.jwt.accessToken, {
      expiresIn: '1h',
    });
  },
  generateRefreshToken: (payload) => {
    return Jwt.sign(payload, config.jwt.refreshToken, {
      expiresIn: '30d',
    });
  },
  verifyAccessToken: (payload) => {
    try {
      return Jwt.verify(payload, config.jwt.accessToken);
    } catch (error) {
      // Throw specific errors based on JWT error type
      if (error.name === 'TokenExpiredError') {
        throw new AuthenticationError('Token telah kadaluarsa');
      } else if (error.name === 'JsonWebTokenError') {
        throw new InvariantError('Token tidak valid');
      } else {
        throw new InvariantError('Token verification failed');
      }
    }
  },
  verifyRefreshToken: (payload) => {
    try {
      return Jwt.verify(payload, config.jwt.refreshToken);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new InvariantError('Refresh token telah kadaluarsa');
      } else {
        throw new InvariantError('Refresh token tidak valid');
      }
    }
  },
};

module.exports = tokenManager;
