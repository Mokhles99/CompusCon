const express = require('express');
const multer = require('multer');
const router = express.Router();
const coursController = require('../controllers/cours.controller'); // Assurez-vous que le chemin d'accès est correct

// Configuration pour le téléchargement de fichiers
const storage = multer.memoryStorage(); // Ou utilisez multer.diskStorage si vous voulez stocker les fichiers sur le disque
const upload = multer({ storage });

// Créer un cours avec un support de cours
router.post('/cours/new', upload.single('file'), coursController.createCours);

// Obtenir tous les cours
router.get('/cours', coursController.getAllCours);

// Obtenir un cours spécifique par son ID
router.get('/cours/:id', coursController.getCours);

// Mettre à jour un cours
router.put('/cours/update/:id', upload.single('file'), coursController.editCours);

// Supprimer un cours
router.delete('/cours/delete/:id', coursController.deleteCours);

// Obtenir tous les cours d'un utilisateur spécifique
router.get('/cours/user/:userId', coursController.getCoursByUser);

module.exports = router;
