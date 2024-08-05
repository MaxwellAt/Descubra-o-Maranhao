const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');
const db = require('../config/db');

async function createAdminUser() {
    try {
        const nome = 'admin';
        const email = 'admin@admin.com';
        const senha = 'admin';
        const senhaHash = await bcrypt.hash(senha, 10);

        const usuario = new Usuario(nome, email, senhaHash);
        const id = await usuario.create();

        console.log(`Usuário admin criado com sucesso. ID: ${id}`);
    } catch (error) {
        if(error.code === 'ER_DUP_ENTRY') {
            console.log('Usuário admin já existe');
            return;
        }
        console.error('Erro ao criar usuário admin:', error.message);
    } finally {
        db.end();
    }
}

createAdminUser();