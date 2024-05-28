// Reclamation.controller.js
const Reclamation = require("../models/reclamation.model");


const User = require("../models/user.model"); // Seulement si vous voulez accéder aux informations de l'utilisateur

// Obtenir toutes les reclamation d'un utilisateur et joindre les informations de l'utilisateur

exports.getAllReclamationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const reclamations = await Reclamation.find({ user: userId })
                            // .populate('user', ['username', 'email']); // Ici, on utilise 'populate' pour joindre les informations d'utilisateur
    res.status(200).json(reclamations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Reclamation.controller.js
exports.createReclamation = async (req, res) => {
  try {

    console.log("Creating Reclamation with data:", req.body);
    const { user, nom, prenom,email,matricule,cin,description,type , reponse } = req.body; // 'user' est l'ID de l'utilisateur
    const newReclamation = new Reclamation({
      user, // Utilisation de l'ID de l'utilisateur
      nom,
      prenom,
      email,
      matricule,
      cin,
      description,
      type,
      reponse
      
    });
    const savedReclamation = await newReclamation.save();
    
    res.status(201).json(savedReclamation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




exports.getReclamation = async (req, res) => {
  try {
    const { id } = req.params;
    const reclamation = await Reclamation.findById(id);
    if (!reclamation) {
      return res.status(404).json({ message: "Reclamation not found" });
    }
    res.status(200).json(reclamation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



// Mettre à jour une Reclamation
exports.updateReclamation = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, prenom,email,matricule,cin,raison,type , statut } = req.body;
    const updatedReclamation = await Reclamation.findByIdAndUpdate(
      id,
      { 
      nom,
      prenom,
      email,
      matricule,
      cin,
      raison,
      type,
      statut },
      { new: true } // Cette option renvoie l'objet mis à jour
    );
    if (!updatedReclamation) {
      return res.status(404).json({ message: "Reclamation not found" });
    }
    res.status(200).json(updatedReclamation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.deleteReclamation = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReclamation = await Reclamation.findByIdAndDelete(id);
    if (!deletedReclamation) {
      return res.status(404).json({ message: "Reclamation not found" });
    }
    res.status(200).json({ message: "Reclamation successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.updateReclamationStatus = async (req, res) => {
  const { id } = req.params;
  const { reponse } = req.body; 

  try {
    const updatedReclamation = await Reclamation.findByIdAndUpdate(id, { reponse }, { new: true });
    if (!updatedReclamation) {
      return res.status(404).json({ message: "Reclamation non trouvée" });
    }
    res.status(200).json(updatedReclamation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur interne" });
  }
};
