const express = require('express');
const router = express.Router();
const atrativosController = require('../controllers/atrativosController');

router.get('/', atrativosController.getAllAtrativos);
router.get('/:id', atrativosController.getAtrativoById);
router.post('/', atrativosController.createAtrativo);
router.delete('/', atrativosController.deleteAllAtrativos);

module.exports = router;