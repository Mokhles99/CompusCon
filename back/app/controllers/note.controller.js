// note.controller.js
const Note = require("../models/note.model");


const User = require("../models/user.model"); // Seulement si vous voulez accéder aux informations de l'utilisateur

// Obtenir toutes les notes d'un utilisateur et joindre les informations de l'utilisateur

exports.getAllNotesByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const notes = await Note.find({ user: userId })
                            // .populate('user', ['username', 'email']); // Ici, on utilise 'populate' pour joindre les informations d'utilisateur
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// note.controller.js
exports.createNote = async (req, res) => {
  try {

    console.log("Creating note with data:", req.body);
    const { user, title, content } = req.body; // 'user' est l'ID de l'utilisateur
    const newNote = new Note({
      user, // Utilisation de l'ID de l'utilisateur
      title,
      content
    });
    const savedNote = await newNote.save();
    
    res.status(201).json(savedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};














exports.getNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Mettre à jour une note
exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true } // Cette option renvoie l'objet mis à jour
    );
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
