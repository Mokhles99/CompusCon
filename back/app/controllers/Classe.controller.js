const Classe = require('../models/Classe.model');

exports.createClasse = async (req, res) => {
    try {
        const classe = new Classe({
            ...req.body
        });
        await classe.save();
        res.send({ message: "Classe créée avec succès.", classe });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getAllClasses = async (req, res) => {
    try {
        const classes = await Classe.find();
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getClasse = async (req, res) => {
    try {
        const classe = await Classe.findById(req.params.id);
        if (!classe) res.status(404).json({ message: "Classe not found" });
        else res.status(200).json(classe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateClasse = async (req, res) => {
    try {
        const updatedClasse = await Classe.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedClasse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteClasse = async (req, res) => {
    try {
        await Classe.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Classe deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Ajoutez la fonction d'assignation de professeur ici
exports.assignerProf = async (req, res) => {
    try {
        // Exemple d'implémentation, ajustez selon vos besoins
        const classe = await Classe.findById(req.params.classeId);
        if (!classe) {
            return res.status(404).send({ message: "Classe not found" });
        }
        classe.professeur = req.body.professeur; // Assurez-vous que 'professeur' est bien passé dans le corps de la requête
        await classe.save();
        res.status(200).json({ message: "Professeur assigné avec succès à la classe.", classe });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
