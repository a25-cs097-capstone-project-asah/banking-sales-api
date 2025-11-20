const { nanoid } = require('nanoid');
const NotFoundError = require('../../exceptions/NotFoundError');
const InvariantError = require('../../exceptions/InvariantError');
const { notesToModel } = require('../../utils/mapDBToModel');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class NotesService {
  constructor(pool) {
    this._pool = pool;
  }

  async addNotes(leadId, userId, body) {
    await this.verifyLeadExist(leadId);

    const id = `nt-${nanoid(6)}`;
    const createdAt = new Date().toISOString();
    const query = {
      text: `INSERT INTO notes(id, lead_id, user_id, body, created_at) 
              VALUES($1, $2, $3, $4, $5) RETURNING id`,
      values: [id, leadId, userId, body, createdAt],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new InvariantError('Catatan gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async verifyLeadExist(leadId) {
    const query = {
      text: 'SELECT id FROM leads WHERE id = $1',
      values: [leadId],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Lead tidak ditemukan');
    }
  }

  async getNotesByLeadId(leadId) {
    const query = {
      text: `SELECT notes.id, notes.body, notes.created_at, users.fullname, users.role
              FROM notes
              LEFT JOIN users ON notes.user_id = users.id
              WHERE notes.lead_id = $1
              ORDER BY notes.created_at DESC`,
      values: [leadId],
    };

    const result = await this._pool.query(query);
    return result.rows.map(notesToModel);
  }

  async editNoteByNoteId(noteId, { body }) {
    const query = {
      text: 'UPDATE notes SET body = $1 WHERE id = $2 RETURNING id',
      values: [body, noteId],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Catatan gagal diperbarui. Id tidak ditemukan');
    }
  }

  async deleteNoteByNoteId(noteId) {
    const query = {
      text: 'DELETE FROM notes WHERE id = $1 RETURNING id',
      values: [noteId],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Gagal menghapus catatan. Id tidak ditemukan');
    }
  }

  async verifyNoteAccess(noteId, userId) {
    const query = {
      text: 'SELECT * FROM notes WHERE id = $1 AND user_id = $2',
      values: [noteId, userId],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
  }
}

module.exports = NotesService;
