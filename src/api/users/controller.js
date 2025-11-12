const asyncHandler = require('../../utils/asyncHandler');
const { validatePayload } = require('./validator');
const UsersService = require('../../services/postgre/UsersService');
const userService = new UsersService();

const postUserController = asyncHandler(async (req, res) => {
  validatePayload(req.body);
  const { username, password, fullname, email, phone, role } = req.body;

  const userId = await userService.addUser({
    username,
    password,
    fullname,
    email,
    phone,
    role,
  });
  res.status(201).json({
    status: 'success',
    message: 'User berhasil ditambahkan',
    data: {
      userId,
    },
  });
});

const getUsersController = asyncHandler(async (req, res) => {
  const users = await userService.getUsers();
  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

const getUserDetailController = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

module.exports = {
  postUserController,
  getUsersController,
  getUserDetailController,
};
