require('dotenv').config();
const bcrypt = require('bcrypt');
const { usersToModel } = require('../../utils/mapDBToModel');
const { userPass } = require('../../config/environment');

// Error handling
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthenticationsError = require('../../exceptions/AuthenticationError');

class UsersService {
  constructor(pool) {
    this._pool = pool;
  }

  async generateUsers() {
    const users = [
      {
        id: 'user-c9m7k8t3',
        username: 'Driyan',
        fullname: 'Adriyan',
        email: 'adrian@email.com',
        phone: '+62 851-2233-4455',
        role: 'sales',
      },
      {
        id: 'user-x1234abc',
        username: 'BunaTed',
        fullname: 'Buna Teddy',
        email: 'buna@teddy.com',
        phone: '+62 812-0000-1111',
        role: 'sales',
      },
    ];

    const password = userPass;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdAt = new Date().toISOString();

    for (const user of users) {
      await this._pool.query(
        `INSERT INTO users(id, username, password, fullname, email, phone, role, created_at) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          user.id,
          user.username,
          hashedPassword,
          user.fullname,
          user.email,
          user.phone,
          user.role,
          createdAt,
        ]
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
