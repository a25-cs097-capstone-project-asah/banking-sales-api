const { nanoid } = require('nanoid');
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

  // Fitur menambahkan users (hanya sebagai fitur testing)
  async addUser(userData) {
    const {
      username,
      password,
      fullname,
      email,
      phone,
      role = 'sales',
    } = userData;
    await this.verifyNewUsername(username);
    const id = `user-${nanoid(8)}`;
    const createdAt = new Date().toISOString();
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
      values: [
        id,
        username,
        hashedPassword,
        fullname,
        email,
        phone,
        role,
        createdAt,
      ],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new InvariantError('User gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async verifyNewUsername(username) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);
    if (result.rows.length > 0) {
      throw new InvariantError(
        'Gagal menambahkan user, Username telah digunakan'
      );
    }
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

  async getUserDetail(id) {
    const query = {
      text: 'SELECT id, username, fullname, email, phone, role, created_at FROM users WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('User gagal ditampilkan. Id tidak ditemukan');
    }

    return result.rows[0];
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
