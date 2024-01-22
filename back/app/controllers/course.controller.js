// app/controllers/course.controller.js
const Course = require('../models/course.model'); // Correction ici


// Créer un cours avec un support de cours
exports.createCourse = async (req, res) => {
  try {
    const { name, description, schedule, room, students } = req.body;
    // Correction ici, utiliser Course au lieu de EnseignantCourse
    const course = await Course.create({ name, description, schedule, room, students, courseFile: req.file });
    res.status(201).json(course);
  } catch (error) {
    console.error(error);  // Ajout de cette ligne pour voir l'erreur dans la console
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Mettre à jour un cours
exports.updateCourse = async (req, res) => {
  try {
    const { name, students, schedule, room } = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, { name, students, schedule, room }, { new: true });
    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un cours
exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};  