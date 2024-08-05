const db = require('../config/db');

class Atrativo {
    constructor(nome, tipo, descricao, dicas, destinoId) {
        this.nome = nome;
        this.tipo = tipo;
        this.descricao = descricao;
        this.dicas = JSON.stringify(dicas);
        this.destinoId = destinoId;
    }

    create() {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO atrativos (nome, tipo, descricao, dicas, destino_id) VALUES (?, ?, ?, ?, ?)';
            db.query(sql, [this.nome, this.tipo, this.descricao, this.dicas, this.destinoId], (err, result) => {
                if (err) return reject(err);
                resolve(result.insertId);
            });
        });
    }
}

module.exports = Atrativo;