
const Attestation = require('../models/attestation.model');

exports.creerDemande = async (req, res) => {
  try {
    const { nom, prenom, email, matricule, cin, raison, type } = req.body;

    if (!nom || !prenom || !email || !matricule || !cin || !raison || !type) {
      return res.status(400).json({ message: 'Veuillez fournir toutes les informations nécessaires.' });
    }

    const nouvelleDemande = new Attestation({
      nom,
      prenom,
      email,
      matricule,
      cin,
      raison,
      type,
    });

    const demandeEnregistree = await nouvelleDemande.save();
    res.status(201).json({ message: 'Demande d\'attestation créée avec succès', demande: demandeEnregistree });
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ message: 'Une erreur est survenue lors de la création de la demande d\'attestation.' });
  }
};

exports.listeDemandes = async (req, res) => {
  try {
    const demandes = await Attestation.find({});
    res.status(200).json(demandes);
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des demandes d\'attestation.' });
  }
};

exports.updateAttestation = async (req, res) => {
  try {
    const { nom, prenom, email, matricule, cin, raison, type } = req.body;

    if (!nom || !prenom || !email || !matricule || !cin || !raison || !type) {
      return res.status(400).json({ message: 'Veuillez fournir toutes les informations nécessaires.' });
    }

    const attestation = await Attestation.findByIdAndUpdate(
      req.params.attestationId,
      { nom, prenom, email, matricule, cin, raison, type, updatedAt: Date.now() },
      { new: true }
    );

    if (!attestation) {
      return res.status(404).json({ message: 'Attestation non trouvée.' });
    }

    res.status(200).json(attestation);
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour de la demande d\'attestation.' });
  }
};

exports.deleteAttestation = async (req, res) => {
  try {
    const attestation = await Attestation.findByIdAndRemove(req.params.attestationId);

    if (!attestation) {
      return res.status(404).json({ message: 'Attestation non trouvée.' });
    }

    res.status(200).json({ message: 'Attestation supprimée avec succès!' });
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de la demande d\'attestation.' });
  }
};
