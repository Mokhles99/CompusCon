const express = require ('express')

const router = express.Router();

const reclamationController = require('../controllers/reclamation.controller');


  // Créer une nouvelle demande d'reclamation
  router.post('/reclamation/new', reclamationController.createReclamation);
  router.get("/reclamation/user/:userId", reclamationController.getAllReclamationsByUser);
  // Récupérer la liste des demandes d'reclamation
  router.get('/reclamation/:id', reclamationController.getReclamation);

  // Mettre à jour une demande d'reclamation
  router.put('/reclamation/update/:id', reclamationController.updateReclamation);

  // Supprimer une demande d'reclamation
  router.delete('/reclamation/delete/:id', reclamationController.deleteReclamation);

  router.put('/reclamation/response/:id', reclamationController.updateReclamationStatus);


module.exports = router ;