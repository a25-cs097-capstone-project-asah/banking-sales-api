const asyncHandler = require('../../utils/asyncHandler');
const { usersService } = require('../../services/postgre');

const getUsersController = asyncHandler(async (req, res) => {
  const users = await usersService.getUsers();
  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

const getUserDetailController = asyncHandler(async (req, res) => {
  const user = await usersService.getUserDetail(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

module.exports = {
  getUsersController,
  getUserDetailController,
};
