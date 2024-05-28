
const express = require('express');
const emploiController = require('../controllers/emploi.controller');
const upload = require('../middlewares/fileUpload'); // Assurez-vous que le chemin d'importation est correct

const router = express.Router();

// Utiliser le middleware multer pour la route qui crée un nouvel emploi
router.post('/new', upload.single('file'), emploiController.createEmploi);

// Pas besoin de multer ici car on ne télécharge pas de fichier lorsqu'on récupère la liste ou un emploi spécifique
router.get('/emplois', emploiController.getAllEmplois);
router.get('/:id', emploiController.getEmploi);

// Utiliser le middleware multer également pour la mise à jour si vous voulez permettre le changement du fichier
router.put('/update/:id', upload.single('file'), emploiController.updateEmploi);

router.delete('/delete/:id', emploiController.deleteEmploi);

module.exports = router;

