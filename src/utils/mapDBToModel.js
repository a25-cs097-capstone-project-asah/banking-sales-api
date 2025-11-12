const usersToModel = ({
  id,
  username,
  password,
  fullname,
  email,
  phone,
  role,
  created_at,
  last_login,
}) => ({
  id,
  username,
  password,
  fullname,
  email,
  phone,
  role,
  createdAt: created_at,
  lastLogin: last_login,
});

module.exports = { usersToModel };
