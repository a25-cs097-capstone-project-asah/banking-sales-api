const bcrypt = require('bcrypt');
const { usersToModel } = require('../../utils/mapDBToModel');

// Error handling
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthenticationsError = require('../../exceptions/AuthenticationError');

class UsersService {
  constructor(pool) {
    this._pool = pool;
  }

  async getUsers() {
    const result = await this._pool.query(
      'SELECT id, username, fullname, role FROM users'
    );
    if (!result.rows.length) {
      throw new NotFoundError('Users tidak ditemukan');
    }
    return result.rows.map(usersToModel);
  }

  async verifyUserCredential(username, password) {
    const query = {
      text: 'SELECT id, password FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new InvariantError('Kredensial yang Anda berikan salah');
    }

    const { id, password: hashedPassword } = result.rows[0];

    const match = await bcrypt.compare(password, hashedPassword);
    if (!match) {
      throw new AuthenticationsError('Kredensial yang Anda berikan salah');
    }

    return id;
  }
}

module.exports = UsersService;
