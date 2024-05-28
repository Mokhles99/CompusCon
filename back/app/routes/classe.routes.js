const express = require("express");
const { authJwt } = require("../middlewares");
const ClasseController = require("../controllers/Classe.controller");

const router = express.Router();

router.post("/classe/new",  ClasseController.createClasse);

router.get("/classes",  ClasseController.getAllClasses);

router.get("/classe/:id",  ClasseController.getClasse);

router.put("/classe/update/:id",  ClasseController.updateClasse);

router.delete("/classe/delete/:id",  ClasseController.deleteClasse);

router.put("/classe/assignerProf/:classeId",  ClasseController.assignerProf);

module.exports = router;
