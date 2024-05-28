const mongoose = require("mongoose");

const absenceSchema = new mongoose.Schema({
    etudiant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    classe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classe"
    },
    date: Date,
    status: String // Exemple: "Present" ou "Absent"
}, { timestamps: true });

module.exports = mongoose.model("Absence", absenceSchema);
