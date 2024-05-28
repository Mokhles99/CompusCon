// Dans votre fichier de routes, par exemple, noteInfoRoutes.js

const express = require('express');
const router = express.Router();
const noteInfoController = require('../controllers/noteInfo.controller');

router.get('/noteInfos', noteInfoController.getAllNoteInfos);

router.get('/noteInfos/count', noteInfoController.getNoteInfoCount);

router.get('/noteInfos/:id', noteInfoController.getNoteInfoById);
router.put('/noteInfos/:id', noteInfoController.updateNoteInfoStatus);
router.delete('/noteInfos/:id', noteInfoController.deleteNoteInfo);
router.post('/noteInfos', noteInfoController.createNoteInfo);


module.exports = router;
