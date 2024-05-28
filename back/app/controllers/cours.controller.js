const cloudinary = require('cloudinary').v2;
const Cours = require('../models/cours.model');
const fs = require('fs'); // Nécessaire pour le nettoyage des fichiers

// Configuration de Cloudinary (déjà faite dans votre code)

exports.createCours = async (req, res) => {
    try {
        // Validation des données
        const { title, description, user } = req.body;
        if (!title || !description || !user) {
            return res.status(400).json({ message: "Données manquantes" });
        }

        let fileLink = {};

        // Téléchargement sur Cloudinary
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "cours",
                // Autres options comme limitation de taille, type, etc.
            });
            fileLink = {
                public_id: result.public_id,
                url: result.secure_url
            };

            // Nettoyage du fichier temporaire
            fs.unlinkSync(req.file.path);
        }

        const newCoursData = { title, description, file: fileLink, user };
        const newCours = await Cours.create(newCoursData);

        res.status(201).json({ success: true, cours: newCours });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error', error: err });
    }
};



// Autres méthodes pour lire, mettre à jour, supprimer des cours...
exports.editCours = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        let fileLink = {};

        if (req.file) {
            // Supprimez l'ancien fichier de Cloudinary ici si nécessaire

            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "cours"
            });
            fileLink = {
                public_id: result.public_id,
                url: result.secure_url
            };
        }

        const updatedCours = await Cours.findByIdAndUpdate(id, {
            title,
            description,
            ...(req.file && { file: fileLink }),
        }, { new: true });

        if (!updatedCours) {
            return res.status(404).json({ message: "Cours not found" });
        }

        res.status(200).json(updatedCours);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteCours = async (req, res) => {
    try {
        const { id } = req.params;
        const cours = await Cours.findById(id);

        // Supprimez le fichier de Cloudinary
        if (cours.file && cours.file.public_id) {
            await cloudinary.uploader.destroy(cours.file.public_id);
        }

        await cours.remove();

        res.status(200).json({ message: "Cours successfully deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCours = async (req, res) => {
  try {
      const { id } = req.params;
      const cours = await Cours.findById(id);

      if (!cours) {
          return res.status(404).json({ message: "Cours not found" });
      }

      res.status(200).json(cours);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};
exports.getCoursByUser = async (req, res) => {
  try {
      const { userId } = req.params;
      const cours = await Cours.find({ user: userId });

      res.status(200).json(cours);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

exports.getAllCours = async (req, res) => {
    try {
        const cours = await Cours.find({});
        res.status(200).json(cours);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
  };