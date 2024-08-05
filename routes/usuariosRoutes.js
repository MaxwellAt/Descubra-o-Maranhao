const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, usuariosController.getAllUsuarios);
router.get('/:id', authMiddleware, usuariosController.getUsuarioById);
router.post('/', authMiddleware, usuariosController.createUsuario);
router.put('/:id', authMiddleware, usuariosController.updateUsuario);
router.delete('/:id', authMiddleware, usuariosController.deleteUsuario);
router.post('/validate', usuariosController.validateUsuario); // Nova rota para validação

module.exports = router;