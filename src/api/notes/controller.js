const { notesService } = require('../../services/postgre');
const asyncHandler = require('../../utils/asyncHandler');
const noteValidatePayload = require('./validator');

/**
 * @api {post} /leads/:leadId/notes Tambah catatan untuk lead
 * @apiName AddNote
 * @apiGroup Notes
 *
 * @apiParam {String} leadId
 *
 * @apiBody {String} body
 *
 * @apiSuccess (201) {String} noteId
 */

const postNotesController = asyncHandler(async (req, res) => {
  noteValidatePayload(req.body);
  const { leadId } = req.params;
  const { body } = req.body;
  const { userId } = req;

  const noteId = await notesService.addNotes(leadId, userId, body);
  res.status(201).json({
    status: 'success',
    message: 'Catatan berhasil ditambahkan',
    data: {
      noteId,
    },
  });
});

/**
 * @api {get} /leads/:leadId/notes Ambil semua catatan berdasarkan lead
 * @apiName GetNotesByLead
 * @apiGroup Notes
 *
 * @apiParam {String} leadId
 *
 * @apiSuccess (200) {Object[]} notes
 */

const getNotesByLeadIdController = asyncHandler(async (req, res) => {
  const { leadId } = req.params;

  const notes = await notesService.getNotesByLeadId(leadId);
  res.status(200).json({
    status: 'success',
    data: {
      notes,
    },
  });
});

/**
 * @api {put} /notes/:noteId Update catatan
 * @apiName UpdateNote
 * @apiGroup Notes
 *
 * @apiParam {String} noteId
 *
 * @apiBody {String} body
 *
 * @apiSuccess (200) {String} message
 */

const putNoteByNoteIdController = asyncHandler(async (req, res) => {
  noteValidatePayload(req.body);
  const { noteId } = req.params;
  const { userId } = req;

  await notesService.verifyNoteAccess(noteId, userId);
  await notesService.editNoteByNoteId(noteId, req.body);

  res.status(200).json({
    status: 'success',
    message: 'Catatan berhasil diperbarui',
  });
});

/**
 * @api {delete} /notes/:noteId Hapus catatan
 * @apiName DeleteNote
 * @apiGroup Notes
 *
 * @apiParam {String} noteId
 *
 * @apiSuccess (200) {String} message
 */

const deleteNoteByNoteIdController = asyncHandler(async (req, res) => {
  const { noteId } = req.params;
  const userId = req.userId;

  await notesService.verifyNoteAccess(noteId, userId);
  await notesService.deleteNoteByNoteId(noteId);
  res.status(200).json({
    status: 'success',
    message: 'Catatan berhasil dihapus',
  });
});

module.exports = {
  postNotesController,
  getNotesByLeadIdController,
  putNoteByNoteIdController,
  deleteNoteByNoteIdController,
};
