const db = require('../config/db');

class Usuario {
    constructor(nome, email, senhaHash) {
        this.nome = nome;
        this.email = email;
        this.senhaHash = senhaHash;
    }

    create() {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)';
            db.query(sql, [this.nome, this.email, this.senhaHash], (err, result) => {
                if (err) return reject(err);
                resolve(result.insertId);
            });
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM usuarios WHERE id = ?';
            db.query(sql, [id], (err, result) => {
                if (err) return reject(err);
                resolve(result[0]);
            });
        });
    }

    static findAll() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM usuarios';
            db.query(sql, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    static update(id, nome, email, senhaHash) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE usuarios SET nome = ?, email = ?, senha_hash = ? WHERE id = ?';
            db.query(sql, [nome, email, senhaHash, id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM usuarios WHERE id = ?';
            db.query(sql, [id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    static findByEmail(email) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM usuarios WHERE email = ?';
            db.query(sql, [email], (err, result) => {
                if (err) return reject(err);
                if (result.length > 0) {
                    const user = result[0];
                    delete user.senha; // Remove a senha do objeto de resultado
                    resolve(user);
                } else {
                    resolve(null); // Nenhum usuário encontrado
                }
            });
        });
    }
}

module.exports = Usuario;