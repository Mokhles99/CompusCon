const express = require ('express')

const router = express.Router();

const controller = require('../controllers/attestation.controller');


  // Créer une nouvelle demande d'attestation
  router.post('/attestation/new', controller.creerDemande);

  // Récupérer la liste des demandes d'attestation
  router.get('/attestations', controller.listeDemandes);

  // Mettre à jour une demande d'attestation
  router.put('/attestation/:id', controller.updateAttestation);

  // Supprimer une demande d'attestation
  router.delete('/attestation/:id', controller.deleteAttestation);


module.exports = router ;