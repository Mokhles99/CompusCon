const mongoose = require("mongoose");

const classeSchema = new mongoose.Schema({
    nom: String,
    section: String,
    niveau: String,
    anneeScolaire: String,
    professeur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    etudiants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }]
}, { timestamps: true });
const Classe = mongoose.model('Classe', classeSchema);

module.exports = Classe;
