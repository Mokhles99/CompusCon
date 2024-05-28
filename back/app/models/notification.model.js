const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['Reclamation', 'Attestation', 'Rattrapage','MaterielProf','ContactProf'], 
    },
    status: {
        type: String,
        required: false,
        enum: ['non lu', 'lu', 'traité'], 
    },
    creationDate: {
        type: Date,
        default: Date.now, 
    },
    relatedRecordId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Reclamation', 'Attestation','Rattrapage','MaterielProf','ContactProf'] // Modèles associés
    }
});

module.exports = mongoose.model('Notification', notificationSchema);
