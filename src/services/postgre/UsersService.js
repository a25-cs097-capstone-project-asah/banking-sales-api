const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthenticationsError = require('../../exceptions/AuthenticationError');
const { usersToModel } = require('../../utils/mapDBToModel');

class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  async addUser({
    username,
    password,
    fullname,
    email,
    phone,
    role = 'sales',
  }) {
    await this.verifyNewUsername(username);
    const id = `user-${nanoid(15)}`;
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
    if (result.rows.length) {
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
      'SELECT id, username, password, fullname, email FROM users'
    );

    return result.rows.map(usersToModel);
  }

  async getUserDetail(id) {
    const query = {
      text: 'SELECT * FROM users WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('User gagal ditampilkan. Id tidak ditemukan');
    }

    return result.rows[0].id;
  }

  async verifyUserCredential(username, password) {
    const query = {
      text: 'SELECT id, password FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new InvariantError('Kredensial yang anda berikan salah');
    }

    const { id, password: hashedPassword } = result.rows[0];

    const match = await bcrypt.compare(password, hashedPassword);
    if (!match) {
      throw new AuthenticationsError('Kredensial yang anda berikan salah');
    }

    return id;
  }
}

module.exports = UsersService;
