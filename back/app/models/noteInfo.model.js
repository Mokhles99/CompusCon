const mongoose = require('mongoose');

const noteInfoSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['Evenement', 'Certification','Annonce'], 
    },  
  
    creationDate: {
        type: Date,
        default: Date.now, 
    },
    status: {
        type: String,
        required: false,
        enum: ['non lu', 'lu'], 
    },
    relatedRecordId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Certif','Event','Annonce'] // Modèles associés
    }
});

module.exports = mongoose.model('NoteInfo', noteInfoSchema);
