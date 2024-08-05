const express = require('express');
const router = express.Router();
const destinosController = require('../controllers/destinosController');

router.get('/', destinosController.getAllDestinos);
router.post('/', destinosController.createDestino);
router.delete('/', destinosController.deleteAllDestinos);

module.exports = router;