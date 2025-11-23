// Import validations
const {
  postValidatePayload,
  putValidatePayload,
  deleteValidatePayload,
} = require('./validator');

// Import services
const {
  authenticationsService,
  usersService,
} = require('../../services/postgre');

// Import utils
const tokenManager = require('../../utils/tokenManager');
const asyncHandler = require('../../utils/asyncHandler');

/**
 * @api {post} /authentications Login user
 * @apiName Login
 * @apiGroup Authentications
 *
 * @apiBody {String} username
 * @apiBody {String} password
 *
 * @apiSuccess (201) {String} accessToken
 * @apiSuccess (201) {String} refreshToken
 */

// Controller pada fitur login
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

/**
 * @api {put} /authentications Refresh access token
 * @apiName RefreshToken
 * @apiGroup Authentications
 *
 * @apiBody {String} refreshToken
 *
 * @apiSuccess (200) {String} accessToken
 */

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

/**
 * @api {delete} /authentications Logout user
 * @apiName Logout
 * @apiGroup Authentications
 *
 * @apiBody {String} refreshToken
 *
 * @apiSuccess (200) {String} message
 */

// Controller pada fitur logout
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
