const db = require('../config/db');
const atrativosController = require('./atrativosController');

exports.getAllDestinos = (req, res) => {
    const query = `
        SELECT 
            destinos.id AS destino_id,
            destinos.nome AS destino_nome,
            destinos.descricao AS destino_descricao,
            destinos.latitude AS destino_latitude, 
            destinos.longitude AS destino_longitude,
            destinos.imagem_link AS destino_imagem_url,
            destinos.região AS destino_regiao,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', atrativos.id,
                    'nome', atrativos.nome,
                    'descricao', atrativos.descricao,
                    'dica', atrativos.dicas,
                    'tipo', atrativos.tipo
                )
            ) AS atrativos
        FROM destinos
        LEFT JOIN atrativos ON destinos.id = atrativos.destino_id
        GROUP BY destinos.id;
    `;

    db.query(query, (error, results) => {
        if (error) return res.status(500).json({ error });
        res.json(results);
    });
};
exports.createDestino = async (req, res) => {
    try {
        const { nome, descricao, latitude, longitude, imagem_url, regiao, atrativos } = req.body;
        if(!nome || !descricao || !latitude || !longitude || !imagem_url || !regiao) {
            return res.status(400).json({ error: 'Nome, descrição, latitude, longitude, imagem_url e região são obrigatórios' });
        }

        const sql = 'INSERT INTO destinos (nome, descricao, latitude, longitude, imagem_link, região) VALUES (?, ?, ?, ?, ?, ?)';
        
        db.query(sql, [nome, descricao, latitude, longitude, imagem_url, regiao], async (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            const destinoId = result.insertId;

            // tentar criar o atrativo junto
            if (atrativos && atrativos.length > 0) {
                for (const atrativo of atrativos) {
                    await new Promise((resolve, reject) => {
                        const atrativoSql = 'INSERT INTO atrativos (nome, descricao, dicas, tipo, destino_id) VALUES (?, ?, ?, ?, ?)';
                        const dicasJson = JSON.stringify(atrativo.dicas);
                        db.query(atrativoSql, [atrativo.nome, atrativo.descricao, dicasJson, atrativo.tipo, destinoId], (err, result) => {
                            if (err) return reject(err);
                            resolve(result.insertId);
                        });
                    });
                }
            }

            res.json({ message: 'Destino criado com sucesso', id: destinoId });
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteAllDestinos = (req, res) => {
    const deleteAtrativosSql = 'DELETE FROM atrativos';
    db.query(deleteAtrativosSql, (error, results) => {
        if (error) return res.status(500).json({ error: error.message });

        const deleteDestinosSql = 'DELETE FROM destinos';
        db.query(deleteDestinosSql, (error, results) => {
            if (error) return res.status(500).json({ error: error.message });
            res.json({ message: 'Todos os destinos foram deletados' });
        });
    });
};