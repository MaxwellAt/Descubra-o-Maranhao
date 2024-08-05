const db = require('../config/db');

class Destino {
    constructor(nome, descricao, latitude, longitude, imagemUrl, regiao, imagem) {
        this.nome = nome;
        this.descricao = descricao;
        this.latitude = latitude;
        this.longitude = longitude;
        this.imagemUrl = imagemUrl;
        this.regiao = regiao;
        this.imagem = imagem;
    }

    create() {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO destinos (nome, descricao, latitude, longitude, imagem_link, região, imagem) VALUES (?, ?, ?, ?, ?, ?, ?)';
            db.query(sql, [this.nome, this.descricao, this.latitude, this.longitude, this.imagemUrl, this.regiao, this.imagem], (err, result) => {
                if (err) return reject(err);
                resolve(result.insertId);
            });
        });
    }
}

module.exports = Destino;