const { notesService } = require('../../services/postgre');
const asyncHandler = require('../../utils/asyncHandler');
const noteValidatePayload = require('./validator');

const postNotesController = asyncHandler(async (req, res) => {
  noteValidatePayload(req.body);
  const { leadId } = req.params;
  const { body } = req.body;
  const userId = req.userId;

  const noteId = await notesService.addNotes(leadId, userId, body);
  res.status(201).json({
    status: 'success',
    message: 'Catatan berhasil ditambahkan',
    data: {
      noteId,
    },
  });
});

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

const deleteNoteController = asyncHandler(async (req, res) => {
  const { noteId } = req.params;
  const userId = req.userId;

  const note = await notesService.deleteNotes(noteId, userId);
  res.status(200).json({
    status: 'success',
    message: 'Catatan berhasil dihapus',
    data: {
      note,
    },
  });
});

module.exports = {
  postNotesController,
  getNotesByLeadIdController,
  deleteNoteController,
};
