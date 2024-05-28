const Emploi = require('../models/emploi.model');

const emploiController = {
    createEmploi: async (req, res) => {
        try {
            const { user, title, description } = req.body;
            let fileUrl = '';
            // Si un fichier est téléchargé, enregistrer son chemin dans la base de données
            if (req.file) {
                fileUrl = req.file.path; // Ou l'URL si vous utilisez un service de stockage de fichiers
            }
            const newEmploi = new Emploi({ user, title, description, file: fileUrl });
            await newEmploi.save();
            res.status(201).json(newEmploi);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getAllEmplois: async (req, res) => {
        try {
            const emplois = await Emploi.find().populate('user', 'username');
            res.status(200).json(emplois);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getEmploi: async (req, res) => {
        try {
            const emploi = await Emploi.findById(req.params.id);
            if (!emploi) return res.status(404).json({ message: "Emploi non trouvé" });
            res.status(200).json(emploi);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateEmploi: async (req, res) => {
        try {
            const updateData = { ...req.body };
            if (req.file) {
                updateData.file = req.file.path; // Mise à jour du chemin du fichier si un nouveau fichier est téléchargé
            }
            const updatedEmploi = await Emploi.findByIdAndUpdate(req.params.id, updateData, { new: true });
            res.status(200).json(updatedEmploi);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteEmploi: async (req, res) => {
        try {
            await Emploi.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "Emploi supprimé avec succès" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = emploiController;
