const express = require('express');
const router = express.Router();
const pcController = require('../controllers/pcController');
const authguard = require('../services/authguard');


router.get('/addpc', authguard, pcController.getAddPc);
router.post('/addpc', authguard, pcController.postAddPc);

router.get('/pc/delete/:id', authguard, pcController.deletePc); // Supprime un pc

router.get('/pc/edit/:id', authguard, pcController.getEditPc); // Affiche le formulaire de modification
router.post('/pc/edit/:id', authguard, pcController.postEditPc); // Modifie un pc

module.exports = router;