// note.routes.js
const express = require("express");
const router = express.Router();
const noteController = require("../controllers/note.controller");

router.post("/note/new", noteController.createNote);
router.get("/notestest/user/:userId", noteController.getAllNotesByUser);
router.get("/note/:id", noteController.getNote);
router.put("/note/update/:id", noteController.updateNote);
router.delete("/note/delete/:id", noteController.deleteNote);
module.exports = router;
