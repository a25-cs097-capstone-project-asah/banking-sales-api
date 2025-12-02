const { nanoid } = require('nanoid');
const NotFoundError = require('../../exceptions/NotFoundError');
const InvariantError = require('../../exceptions/InvariantError');
const { notesToModel } = require('../../utils/mapDBToModel');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class NotesService {
  constructor(pool, leadHistoriesService, cacheService) {
    this._pool = pool;
    this._leadHistoriesService = leadHistoriesService;
    this._cacheService = cacheService;
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

    await this._leadHistoriesService.addHistory(
      leadId,
      userId,
      'ADD_NOTE',
      'Note added'
    );

    await this._cacheService.del(`leads:${leadId}:notes`);
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
    const cachedNotes = await this._cacheService.get(`leads:${leadId}:notes`);
    if (cachedNotes) {
      return JSON.parse(cachedNotes);
    }

    const query = {
      text: `SELECT notes.id, notes.body, notes.created_at, users.fullname, users.role
              FROM notes
              LEFT JOIN users ON notes.user_id = users.id
              WHERE notes.lead_id = $1
              ORDER BY notes.created_at DESC`,
      values: [leadId],
    };

    const result = await this._pool.query(query);
    const notesData = result.rows.map(notesToModel);

    await this._cacheService.set(
      `leads:${leadId}:notes`,
      JSON.stringify(notesData)
    );
    return notesData;
  }

  async editNoteByNoteId(noteId, leadId, userId, { body }) {
    const query = {
      text: 'UPDATE notes SET body = $1 WHERE id = $2 RETURNING id',
      values: [body, noteId],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Catatan gagal diperbarui. Id tidak ditemukan');
    }

    await this._leadHistoriesService.addHistory(
      leadId,
      userId,
      'EDIT_NOTE',
      'Note edited'
    );

    await this._cacheService.del(`leads:${leadId}:notes`);
  }

  async deleteNoteByNoteId(noteId, leadId, userId) {
    const query = {
      text: 'DELETE FROM notes WHERE id = $1 RETURNING id',
      values: [noteId],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Gagal menghapus catatan. Id tidak ditemukan');
    }

    await this._leadHistoriesService.addHistory(
      leadId,
      userId,
      'DELETE_NOTE',
      'Note deleted'
    );

    await this._cacheService.del(`leads:${leadId}:notes`);
  }

  async verifyNoteAccess(noteId, userId) {
    const query = {
      text: 'SELECT * FROM notes WHERE id = $1',
      values: [noteId],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Catatan tidak ditemukan');
    }

    const note = result.rows[0];
    if (note.user_id !== userId) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }

    return note;
  }
}

module.exports = NotesService;
