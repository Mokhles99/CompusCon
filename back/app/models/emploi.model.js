const mongoose = require('mongoose');

const emploiSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assurez-vous d'avoir un modèle User défini quelque part
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: false, // Dépend si vous voulez rendre le champ fichier obligatoire
  },
}, { timestamps: true });

module.exports = mongoose.model('Emploi', emploiSchema);
