const express = require('express');
const router = express.Router();
const chefController = require('../controllers/chefController');


router.get('/register', chefController.getRegister);
router.post('/register', chefController.postRegister);

router.get('/login', chefController.getLogin);
router.post('/login', chefController.postLogin);

router.get('/logout', chefController.getLogout);


module.exports = router;