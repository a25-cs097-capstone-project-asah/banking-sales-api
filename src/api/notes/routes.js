const express = require('express');
const router = express.Router();

const auth = require('../../middlewares/auth');
const controller = require('./controller');

router.post('/leads/:leadId/notes', auth, controller.postNotesController);
router.get('/leads/:leadId/notes', auth, controller.getNotesByLeadIdController);
router.put('/notes/:noteId', auth, controller.putNoteByNoteIdController);
router.delete('/notes/:noteId', auth, controller.deleteNoteByNoteIdController);

module.exports = router;
