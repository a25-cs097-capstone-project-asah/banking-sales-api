const {
  postValidatePayload,
  putValidatePayload,
  deleteValidatePayload,
} = require('./validator');
const tokenManager = require('../../utils/tokenManager');
const asyncHandler = require('../../utils/asyncHandler');
const AuthenticationsService = require('../../services/postgre/authenticationsService');
const UsersService = require('../../services/postgre/UsersService');

const authenticationsService = new AuthenticationsService();
const usersService = new UsersService();

const postAuthenticationsController = asyncHandler(async (req, res) => {
  postValidatePayload(req.body);
  const { username, password } = req.body;

  const id = await usersService.verifyUserCredential(username, password);
  const accessToken = tokenManager.generateAccessToken({ id });
  const refreshToken = tokenManager.generateRefreshToken({ id });

  await authenticationsService.addRefreshToken(refreshToken);

  res.status(201).json({
    status: 'success',
    message: 'Authentication berhasil ditambahkan',
    data: {
      accessToken,
      refreshToken,
    },
  });
});

const putAuthenticationsController = asyncHandler(async (req, res) => {
  putValidatePayload(req.body);
  const { refreshToken } = req.body;

  await authenticationsService.verifyRefreshToken(refreshToken);
  const { id } = tokenManager.verifyRefreshToken(refreshToken);
  const accessToken = tokenManager.generateAccessToken({ id });

  res.status(200).json({
    status: 'success',
    message: 'Access token berhasil diperbarui',
    data: {
      accessToken,
    },
  });
});

const deleteAuthenticationsController = asyncHandler(async (req, res) => {
  deleteValidatePayload(req.body);
  const { refreshToken } = req.body;

  await authenticationsService.verifyRefreshToken(refreshToken);
  await authenticationsService.deleteRefreshToken(refreshToken);

  res.status(200).json({
    status: 'success',
    message: 'Refresh token berhasil dihapus',
  });
});

module.exports = {
  postAuthenticationsController,
  putAuthenticationsController,
  deleteAuthenticationsController,
};
