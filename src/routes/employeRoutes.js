const express = require('express');
const router = express.Router();
const employeController = require('../controllers/employeController');
const authguard = require('../services/authguard');


router.get('/addemploye', authguard, employeController.getAddEmploye);
router.post('/addemploye', authguard, employeController.postAddEmploye);

router.get('/employe/delete/:id', authguard, employeController.deleteEmploye); // Supprime un employé

router.get('/employe/edit/:id', authguard, employeController.getEditEmploye); // Affiche le formulaire de modification
router.post('/employe/edit/:id', authguard, employeController.postEditEmploye); // Modifie un employé

module.exports = router;