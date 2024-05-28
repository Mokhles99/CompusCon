const express = require("express");
const { authJwt } = require("../middlewares");
const AbsenceController = require("../controllers/Absence.controller");

const router = express.Router();

router.post("/absence",  AbsenceController.marquerAbsence);
// Ajoutez d'autres routes pour gérer les absences selon les besoins

module.exports = router;
