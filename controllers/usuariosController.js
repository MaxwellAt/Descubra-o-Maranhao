const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario.js');

exports.getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUsuarioById = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findById(id);
        if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createUsuario = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        const senhaHash = await bcrypt.hash(senha, 10); // Hash the password
        const usuario = new Usuario(nome, email, senhaHash);
        const id = await usuario.create();
        res.json({ message: 'Usuário criado com sucesso', id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, senha } = req.body;
        const senhaHash = await bcrypt.hash(senha, 10); // Hash the password
        await Usuario.update(id, nome, email, senhaHash);
        res.json({ message: 'Usuário atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        await Usuario.delete(id);
        res.json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.validateUsuario = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const usuario = await Usuario.findByEmail(email);
        if (!usuario || !(await bcrypt.compare(senha, usuario.senha_hash))) {
            console.log('Credenciais inválidas');
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }
        console.log('Usuário validado com sucesso');
        res.status(200).json({ message: 'Usuário validado com sucesso', user: usuario });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};