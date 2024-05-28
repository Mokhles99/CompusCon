const mongoose = require('mongoose');

const coursSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    // Modifier le champ `file` pour qu'il puisse stocker l'ID public et l'URL
    file: {
        public_id: {
            type: String, // ID public du fichier sur Cloudinary
            required: false
        },
        url: {
            type: String, // URL du fichier stocké sur Cloudinary
            required: false
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('Cours', coursSchema);
