const db = require("../models/Absence.model");
const Absence = db.absence;

exports.marquerAbsence = async (req, res) => {
    try {
        const absence = new Absence({
            ...req.body
        });
        await absence.save();
        res.send({ message: "Absence enregistrée avec succès.", absence });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Ajoutez d'autres méthodes si nécessaire
